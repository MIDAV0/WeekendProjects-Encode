// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface IMyVotingToken {
    function getPastVotes(address, uint256) external view returns (uint256);
}

contract TokenizedBallot {

    struct Proposal {
        bytes32 name;  
        uint voteCount;
    }

    Proposal[] public proposals;
    IMyVotingToken public tokenContract;
    uint256 public targetBlockNumber;

    mapping(address => uint256) public votingPowerSpent;

    modifier withSnapshot() {
        require(targetBlockNumber != 1, "Target block is not set");
        _;
    }

    constructor(bytes32[] memory proposalNames, address _tokenContract) {
        tokenContract = IMyVotingToken( _tokenContract);
        targetBlockNumber = 1;
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    function makeSnapshot() external {
        require(targetBlockNumber == 1, "Snapshot already been made");
        targetBlockNumber = block.number;
    }

    function vote(uint proposal, uint256 amount) external withSnapshot() {
        // Compute VP
        require(votingPower(msg.sender) >= amount, "Amount exceeds voting power");
        tokenContract.getPastVotes(msg.sender, targetBlockNumber);
        // Increment votes
        votingPowerSpent[msg.sender] += amount;
        proposals[proposal].voteCount += amount;
    }

    function votingPower(address account) public view returns (uint256) {
        return tokenContract.getPastVotes(account, targetBlockNumber) - votingPowerSpent[account];
    }

    function winningProposal() public view
            returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function winnerName() external view withSnapshot()
            returns (bytes32 winnerName_)
    {
        winnerName_ = proposals[winningProposal()].name;
    }
}