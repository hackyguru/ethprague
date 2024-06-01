// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ReVerdeToken is ERC20, Ownable {
    IERC20 public usdcToken;
    address public treasuryAddress;

    error inputAmountMustBeGreaterThanZero();
    error tokenInputTransferFailed();
    error tokenOutputTransferFailed();

    constructor(address _usdcTokenAddress, address _treasuryAddress) ERC20("ReVerde", "RVD") Ownable(msg.sender) {
        usdcToken = IERC20(_usdcTokenAddress);
        treasuryAddress = _treasuryAddress;
    }

    function depositUSDC(uint256 _amount) external {
        if (_amount <= 0) {revert inputAmountMustBeGreaterThanZero();}

        // Transfer USDC from user to this contract
        bool sent = usdcToken.transferFrom(msg.sender, address(this), _amount);
        if (!sent) {revert tokenInputTransferFailed();}

        // Mint ReVerde tokens to user at a 1:1 ratio
        _mint(msg.sender, _amount);

        // Transfer USDC to Gitcoin address
        bool transferred = usdcToken.transfer(treasuryAddress, _amount);
        if (!transferred) {revert tokenOutputTransferFailed();}
    }

    function updatetreasuryAddress(address _newAddress) external onlyOwner {
        treasuryAddress = _newAddress;
    }
}
