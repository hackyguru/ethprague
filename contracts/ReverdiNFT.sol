// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ReverdiNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    IERC20 public rvdToken;
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => uint256) public userDebt;
    mapping(address => bool) private _hasMinted;
    mapping(address => uint256) private _userTokenId;

    error InsufficientRVD();
    error InvalidDebtAmount();
    error URISetOfNonexistentToken();
    error URIQueryForNonexistentToken();
    error AlreadyMinted();
    error TransferNotAllowed();

    constructor(address _rvdTokenAddress) ERC721("ReverdiNFT", "RVDNFT") Ownable(msg.sender) {
        rvdToken = IERC20(_rvdTokenAddress);
    }

    function mintNFT() external {
        if (_hasMinted[msg.sender]) {revert AlreadyMinted();}
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _hasMinted[msg.sender] = true;
        _userTokenId[msg.sender] = newTokenId;
        checkAndUpdateNFTState(newTokenId);
    }

    // Unlocked for proof of concept demo, lock on live deploy
    function updateDebt(address user, uint256 debtAmount) external {
        if (debtAmount <= 0) {revert InvalidDebtAmount();}
        userDebt[user] = debtAmount;
    }

    function checkAndUpdateNFTState(uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        uint256 debt = userDebt[owner];
        uint256 balance = rvdToken.balanceOf(owner);

        if (balance > debt) {
            // Green Version
            _setTokenURI(tokenId, "https://bafybeihbbmb6b7bteqq7dh4preec2vhoughj3up55dk3f7dkreon2byoga.ipfs.w3s.link/");
        } else {
            // Red Version
            _setTokenURI(tokenId, "https://bafybeiextaclv5mlnfgzjaj4l37hxo7n273yowksapoeo6yh2wsmc2bhaq.ipfs.w3s.link/");
        }
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function getTokenIdByAddress(address user) external view returns (uint256) {
        return _userTokenId[user];
    }

    // Override transferFrom to prevent transfers
    function transferFrom(address, address, uint256) public pure override {
        revert TransferNotAllowed();
    }
}
