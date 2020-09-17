pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";


contract SwirgeBar is ERC20("SwirgeBar", "xSWG"){
    using SafeMath for uint256;
    IERC20 public swirge;

    constructor(IERC20 _swirge) public {
        swirge = _swirge;
    }

    // Enter the bar. Pay some SWGs. Earn some shares.
    function enter(uint256 _amount) public {
        uint256 totalSwirge = swirge.balanceOf(address(this));
        uint256 totalShares = totalSupply();
        if (totalShares == 0 || totalSwirge == 0) {
            _mint(msg.sender, _amount);
        } else {
            uint256 what = _amount.mul(totalShares).div(totalSwirge);
            _mint(msg.sender, what);
        }
        swirge.transferFrom(msg.sender, address(this), _amount);
    }

    // Leave the bar. Claim back your SWGs.
    function leave(uint256 _share) public {
        uint256 totalShares = totalSupply();
        uint256 what = _share.mul(swirge.balanceOf(address(this))).div(totalShares);
        _burn(msg.sender, _share);
        swirge.transfer(msg.sender, what);
    }
}
