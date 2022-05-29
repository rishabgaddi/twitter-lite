//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0 <0.9.0;

contract TweetFactory {
    struct Tweet {
        string content;
        uint32 timestamp;
        address author;
        bool deleted;
    }

    Tweet[] public tweets;

    mapping(uint256 => address) public tweeters;

    /**
     * @dev Creates a new tweet.
     * @param _content The content of the tweet.
     */
    function createTweet(string memory _content) public {
        require(bytes(_content).length != 0, "Tweet content cannot be empty.");
        tweets.push(
            Tweet(_content, uint32(block.timestamp), msg.sender, false)
        );
        tweeters[tweets.length - 1] = msg.sender;
    }

    /**
     * @dev Returns all tweets.
     * @return tweets The array of tweets.
     */
    function getTweets() public view returns (Tweet[] memory) {
        return tweets;
    }
}
