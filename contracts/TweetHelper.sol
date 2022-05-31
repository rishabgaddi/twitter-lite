//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0 <0.9.0;

import "./TweetFactory.sol";

contract TweetHelper is TweetFactory {
    /**
      @dev Checks if the tweetId is valid.
      @param _tweetId The id of the tweet.
     */
    modifier validTweetId(uint256 _tweetId) {
        require(
            _tweetId < tweets.length && _tweetId >= 0,
            "Tweet id is invalid."
        );
        _;
    }

    /**
     * @dev Edits a particular tweet.
     * @param _tweetId The id of the tweet to edit.
     * @param _content The new content of the tweet.
     */
    function editTweet(uint256 _tweetId, string memory _content)
        public
        validTweetId(_tweetId)
    {
        require(
            msg.sender == tweeters[_tweetId],
            "You cannot edit this tweet."
        );
        require(bytes(_content).length != 0, "Tweet content cannot be empty.");
        tweets[_tweetId].content = _content;
    }

    /**
     * @dev Deletes a particular tweet.
     * @param _tweetId The id of the tweet to be deleted.
     */
    function deleteTweet(uint256 _tweetId) public validTweetId(_tweetId) {
        require(
            msg.sender == tweeters[_tweetId],
            "You cannot delete this tweet."
        );
        tweets[_tweetId] = Tweet("", 0, address(0), true);
        tweeters[_tweetId] = address(0);
    }

    /**
     * @dev Returns the non-deleted tweet.
     * @param _tweetId The id of the tweet.
     * @return Tweet The non-deleted tweet.
     */
    function getTweet(uint256 _tweetId)
        public
        view
        validTweetId(_tweetId)
        returns (Tweet memory)
    {
        require(
            tweets[_tweetId].deleted == false,
            "This tweet has been deleted."
        );
        return (
            Tweet(
                tweets[_tweetId].content,
                tweets[_tweetId].timestamp,
                tweets[_tweetId].author,
                tweets[_tweetId].deleted
            )
        );
    }

    /**
     * @dev Returns the total count of tweets including deleted ones.
     * @return uint256 The total number of tweets.
     */
    function getTweetCount() public view returns (uint256) {
        return tweets.length;
    }
}
