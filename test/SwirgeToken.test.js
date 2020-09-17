const { expectRevert } = require('@openzeppelin/test-helpers');
const SwirgeToken = artifacts.require('SwirgeToken');

contract('SwirgeToken', ([alice, bob, carol]) => {
    beforeEach(async () => {
        this.swirge = await SwirgeToken.new({ from: alice });
    });

    it('should have correct name and symbol and decimal', async () => {
        const name = await this.swirge.name();
        const symbol = await this.swirge.symbol();
        const decimals = await this.swirge.decimals();
        assert.equal(name.valueOf(), 'SwirgeToken');
        assert.equal(symbol.valueOf(), 'SWG');
        assert.equal(decimals.valueOf(), '18');
    });

    it('should only allow owner to mint token', async () => {
        await this.swirge.mint(alice, '100', { from: alice });
        await this.swirge.mint(bob, '1000', { from: alice });
        await expectRevert(
            this.swirge.mint(carol, '1000', { from: bob }),
            'Ownable: caller is not the owner',
        );
        const totalSupply = await this.swirge.totalSupply();
        const aliceBal = await this.swirge.balanceOf(alice);
        const bobBal = await this.swirge.balanceOf(bob);
        const carolBal = await this.swirge.balanceOf(carol);
        assert.equal(totalSupply.valueOf(), '1100');
        assert.equal(aliceBal.valueOf(), '100');
        assert.equal(bobBal.valueOf(), '1000');
        assert.equal(carolBal.valueOf(), '0');
    });

    it('should supply token transfers properly', async () => {
        await this.swirge.mint(alice, '100', { from: alice });
        await this.swirge.mint(bob, '1000', { from: alice });
        await this.swirge.transfer(carol, '10', { from: alice });
        await this.swirge.transfer(carol, '100', { from: bob });
        const totalSupply = await this.swirge.totalSupply();
        const aliceBal = await this.swirge.balanceOf(alice);
        const bobBal = await this.swirge.balanceOf(bob);
        const carolBal = await this.swirge.balanceOf(carol);
        assert.equal(totalSupply.valueOf(), '1100');
        assert.equal(aliceBal.valueOf(), '90');
        assert.equal(bobBal.valueOf(), '900');
        assert.equal(carolBal.valueOf(), '110');
    });

    it('should fail if you try to do bad transfers', async () => {
        await this.swirge.mint(alice, '100', { from: alice });
        await expectRevert(
            this.swirge.transfer(carol, '110', { from: alice }),
            'ERC20: transfer amount exceeds balance',
        );
        await expectRevert(
            this.swirge.transfer(carol, '1', { from: bob }),
            'ERC20: transfer amount exceeds balance',
        );
    });
  });
