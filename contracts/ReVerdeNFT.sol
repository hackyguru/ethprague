// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ReVerdeNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    IERC20 public rvdToken;
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => uint256) public userDebt;

    error InsufficientRVD();
    error InvalidDebtAmount();
    error URISetOfNonexistentToken();
    error URIQueryForNonexistentToken();

    constructor(address _rvdTokenAddress) ERC721("ReVerdeNFT", "RVDNFT") Ownable(msg.sender) {
        rvdToken = IERC20(_rvdTokenAddress);
    }

    function mintNFT() external {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        checkAndUpdateNFTState(newTokenId);
    }

    function updateDebt(address user, uint256 debtAmount) external onlyOwner {
        if (debtAmount <= 0) {
            revert InvalidDebtAmount();
        }
        userDebt[user] = debtAmount;
    }

    function checkAndUpdateNFTState(uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        uint256 debt = userDebt[owner];
        uint256 balance = rvdToken.balanceOf(owner);

        if (balance >= debt) {
            _setTokenURI(tokenId, "ipfs://GREEN_VERSION_CID");
        } else {
            _setTokenURI(tokenId, "ipfs://RED_VERSION_CID");
        }
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return _tokenURIs[tokenId];
    }
}
