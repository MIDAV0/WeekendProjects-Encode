import { ethers } from "hardhat"
import { expect, assert } from "chai"
import { Ballot } from "../typechain-types"
import { Address } from "cluster"

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"]

describe ("Ballot", function() {
    let ballotContract: Ballot

    beforeEach(async function () {
        const ballotFactory = await ethers.getContractFactory("Ballot")
        const convertedProposals = PROPOSALS.map((proposal) => ethers.utils.formatBytes32String(proposal))
        ballotContract = await ballotFactory.deploy(convertedProposals)
        await ballotContract.deployed()
    })

    describe("When the contract is deployed", function () {
        it("has the provided proposals", async function () {
            for (let i = 0; i < PROPOSALS.length; i++) {
                const proposal = await ballotContract.proposals(i)
                expect(ethers.utils.parseBytes32String(proposal.name)).to.equal(PROPOSALS[i])
            }
        })

        it("has zero votes for all proposals", async function () {
            for (let i = 0; i < PROPOSALS.length; i++) {
                const proposal = await ballotContract.proposals(i)
                expect(proposal.voteCount).to.eq(0)
            }
        })

        it("sets the deployer address as the chairperson", async function () {
            const chairperson = await ballotContract.chairperson()
            const accounts = await ethers.getSigners()
            expect(chairperson).to.eq(accounts[0].address)
        })

        it("sets the voting weight for the chairperson as 1", async function() {
            const chairperson = await ballotContract.chairperson()
            const voter = await ballotContract.voters(chairperson)
            expect(voter.weight).to.eq(1)
        })
    })

    describe("when the chairperson interacts with the giveRightToVote function in the contract", function () {
        it("gives right to vote for another address", async function () {
            const accounts = await ethers.getSigners()
            const voterAddress = accounts[1].address
            await ballotContract.giveRightToVote(voterAddress)
            const voter = await ballotContract.voters(voterAddress)
            expect(voter.weight).to.eq(1)
        });
        it("can not give right to vote for someone that has voted", async function () {
            const accounts = await ethers.getSigners()
            const voterAddress = accounts[1].address
            await ballotContract.giveRightToVote(voterAddress)
            await ballotContract.connect(accounts[1]).vote(1)
            try {
                await ballotContract.giveRightToVote(voterAddress)
                assert(false)
            } catch(error) {
                assert(error)
            }
        });
        it("can not give right to vote for someone that has already voting rights", async function () {
            const accounts = await ethers.getSigners()
            const voterAddress = accounts[1].address
            await ballotContract.giveRightToVote(voterAddress)
            try {
                await ballotContract.giveRightToVote(voterAddress)
                assert(false)
            } catch(error) {
                assert(error)
            }
        });
    });
    
    describe("when the voter interact with the vote function in the contract", function () {
        it("should register the vote", async () => {
            const accounts = await ethers.getSigners()
            const voterAddress = accounts[1].address
            const proposalNum = 1
            const proposalBefore = await ballotContract.proposals(proposalNum)
            await ballotContract.giveRightToVote(voterAddress)
            await ballotContract.connect(accounts[1]).vote(proposalNum)
            const proposalAfter = await ballotContract.proposals(proposalNum)
            expect(proposalBefore.voteCount).to.lt(proposalAfter.voteCount)
        });
    });

    describe("when the voter interact with the delegate function in the contract", function () {
        it("should transfer voting power", async () => {
            const accounts = await ethers.getSigners()
            const voterAddress1 = accounts[1].address
            const voterAddress2 = accounts[2].address
            await ballotContract.giveRightToVote(voterAddress1)
            await ballotContract.giveRightToVote(voterAddress2)
            const delegatedBefore = await ballotContract.voters(voterAddress2)
            await ballotContract.connect(accounts[1]).delegate(voterAddress2)
            const delegatedAfter = await ballotContract.voters(voterAddress2)
            expect(delegatedBefore.weight).to.lt(delegatedAfter.weight)
        });
    });

    describe("when the an attacker interact with the giveRightToVote function in the contract", function () {
    // TODO
        it("should revert", async () => {
            throw Error("Not implemented");
        });
    });

    describe("when the an attacker interact with the vote function in the contract", function () {
    // TODO
        it("should revert", async () => {
            throw Error("Not implemented");
        });
    });

    describe("when the an attacker interact with the delegate function in the contract", function () {
    // TODO
        it("should revert", async () => {
            throw Error("Not implemented");
        });
    });

    describe("when someone interact with the winningProposal function before any votes are cast", function () {
    // TODO
        it("should return 0", async () => {
            throw Error("Not implemented");
        });
    });

    describe("when someone interact with the winningProposal function after one vote is cast for the first proposal", function () {
    // TODO
        it("should return 0", async () => {
            throw Error("Not implemented");
        });
    });

    describe("when someone interact with the winnerName function before any votes are cast", function () {
    // TODO
        it("should return name of proposal 0", async () => {
            throw Error("Not implemented");
        });
    });

    describe("when someone interact with the winnerName function after one vote is cast for the first proposal", function () {
    // TODO
        it("should return name of proposal 0", async () => {
            throw Error("Not implemented");
        });
    });

    describe("when someone interact with the winningProposal function and winnerName after 5 random votes are cast for the proposals", function () {
    // TODO
        it("should return the name of the winner proposal", async () => {
            throw Error("Not implemented");
        });
    });
})