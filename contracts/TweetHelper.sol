//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0 <0.9.0;

import "./TweetFactory.sol";

contract TweetHelper is TweetFactory {
    /**
     * @dev Edit a tweet.
     * @param _tweetId The id of the tweet to edit.
     * @param _content The new content of the tweet.
     */
    function editTweet(uint256 _tweetId, string memory _content) public {
        require(
            msg.sender == tweeters[_tweetId],
            "You cannot edit this tweet."
        );
        tweets[_tweetId].content = _content;
    }

    /**
     * @dev Delete a tweet.
     * @param _tweetId The id of the tweet to delete.
     */
    function deleteTweet(uint256 _tweetId) public {
        require(
            msg.sender == tweeters[_tweetId],
            "You cannot delete this tweet."
        );
        tweets[_tweetId] = Tweet("", 0, address(0), true);
        tweeters[_tweetId] = address(0);
    }

    /**
     * @dev Returns a tweet.
     * @param _tweetId The id of the tweet to return.
     */
    function getTweet(uint256 _tweetId)
        public
        view
        returns (
            string memory,
            uint32,
            address
        )
    {
        return (
            tweets[_tweetId].content,
            tweets[_tweetId].timestamp,
            tweeters[_tweetId]
        );
    }

    /**
     * @dev Returns the total count of tweets including deleted ones.
     */
    function getTweetCount() public view returns (uint256) {
        return tweets.length;
    }

    /**
     * @dev Returns all un-deleted tweets.
     */
    function showTweets() public view returns (Tweet[] memory) {
        Tweet[] memory result;
        for (uint256 i = 0; i < tweets.length; i++) {
            if (!tweets[i].deleted) {
                result[i] = tweets[i];
            }
        }
        return result;
    }
}
