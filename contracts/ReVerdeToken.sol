// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ReVerdeToken is ERC20, Ownable {
    IERC20 public usdcToken;
    address public treasuryAddress;

    error TokenInputTransferFailed();
    error TokenOutputTransferFailed();
    error AmountMustBeGreaterThanZero();
    error InsufficientBalance();
    error TokenTransferFailed();
    error CoinTransferFailed();

    constructor(address _usdcTokenAddress, address _treasuryAddress) ERC20("ReVerde", "RVD") Ownable(msg.sender) {
        usdcToken = IERC20(_usdcTokenAddress);
        treasuryAddress = _treasuryAddress;
    }

    function depositUSDC(uint256 _amount) external {
        if (_amount <= 0) {revert AmountMustBeGreaterThanZero();}

        // Transfer USDC from user to this contract
        bool sent = usdcToken.transferFrom(msg.sender, address(this), _amount);
        if (!sent) {revert TokenInputTransferFailed();}

        // Mint ReVerde tokens to user at a 1:1 ratio
        _mint(msg.sender, _amount);

        // Transfer USDC to treasury address
        bool transferred = usdcToken.transfer(treasuryAddress, _amount);
        if (!transferred) {revert TokenOutputTransferFailed();}
    }

    function updateTreasuryAddress(address _newAddress) external onlyOwner {
        treasuryAddress = _newAddress;
    }

    function withdrawERC20(address _tokenAddress, uint256 _amount) external onlyOwner {
        if (_amount <= 0) {revert AmountMustBeGreaterThanZero();}
        IERC20 token = IERC20(_tokenAddress);
        bool sent = token.transfer(msg.sender, _amount);
        if (!sent) {revert TokenTransferFailed();}
    }

    function withdrawEther(uint256 _amount) external onlyOwner {
        if (_amount <= 0) {revert AmountMustBeGreaterThanZero();}
        if (address(this).balance < _amount) {revert InsufficientBalance();}
        (bool sent, ) = msg.sender.call{value: _amount}("");
        if (!sent) {revert CoinTransferFailed();}
    }

    receive() external payable {}
}
