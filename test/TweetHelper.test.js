const { expect } = require("chai");
const { ethers } = require("hardhat");
require("chai").should();

describe("TweetHelper Smart Contract", function () {
  let TweetHelper;
  let tweetHelper;
  let user1, user2;

  beforeEach(async function () {
    TweetHelper = await ethers.getContractFactory("TweetHelper");
    [user1, user2] = await ethers.getSigners();
    tweetHelper = await TweetHelper.deploy();
  });

  it("Tweet count should be 0 when no tweets are created", async function () {
    const tweets = await tweetHelper.getTweets();
    expect(tweets.length).to.equal(0);

    const tweetCount = await tweetHelper.getTweetCount();
    expect(tweetCount).to.equal(0);
  });

  it("User 1 can edit his/her Tweet", async function () {
    await tweetHelper
      .connect(user1)
      .createTweet("Hello, This is my first tweet.");
    const tweets = await tweetHelper.getTweets();
    expect(tweets.length).to.equal(1);

    await tweetHelper
      .connect(user1)
      .editTweet(0, "Hello, I am editing my first tweet.");

    const editedTweet = await tweetHelper.getTweet(0);
    expect(editedTweet.content).to.equal("Hello, I am editing my first tweet.");
  });

  it("User 2 cannot edit User 1's Tweet", async function () {
    await tweetHelper
      .connect(user1)
      .createTweet("Hello, This is my first tweet.");

    await tweetHelper.connect(user2).createTweet("Hello, User2's First tweet!");
    const tweets = await tweetHelper.getTweets();
    expect(tweets.length).to.equal(2);

    await tweetHelper
      .connect(user2)
      .editTweet(0, "Hello, I am editing my first tweet.")
      .should.be.revertedWith("You cannot edit this tweet.");

    const tweet = await tweetHelper.getTweet(0);
    expect(tweet.content).to.equal("Hello, This is my first tweet.");

    const tweetCount = await tweetHelper.getTweetCount();
    expect(tweetCount).to.equal(2);
  });

  it("User cannot edit a tweet to be empty", async function () {
    await tweetHelper
      .connect(user1)
      .createTweet("Hello, This is my first tweet.");
    const tweets = await tweetHelper.getTweets();
    expect(tweets.length).to.equal(1);

    await tweetHelper
      .connect(user1)
      .editTweet(0, "")
      .should.be.revertedWith("Tweet content cannot be empty.");

    const tweet = await tweetHelper.getTweet(0);
    expect(tweet.content).to.equal("Hello, This is my first tweet.");
  });

  it("User cannot edit a tweet that does not exist", async function () {
    await tweetHelper
      .connect(user1)
      .createTweet("Hello, This is my first tweet.");

    await tweetHelper.connect(user2).createTweet("Hello, User2's First tweet!");
    const tweets = await tweetHelper.getTweets();
    expect(tweets.length).to.equal(2);

    await tweetHelper
      .connect(user1)
      .editTweet(3, "Hello, I am editing my first tweet.")
      .should.be.revertedWith("Tweet id is invalid.");
  });

  it("User 1 can delete his/her Tweet", async function () {
    await tweetHelper
      .connect(user1)
      .createTweet("Hello, This is my first tweet.");

    await tweetHelper
      .connect(user1)
      .createTweet("This is User1's second tweet!!");
    const tweets = await tweetHelper.getTweets();
    expect(tweets.length).to.equal(2);

    await tweetHelper.connect(user1).deleteTweet(0);

    const tweetCount = await tweetHelper.getTweetCount();
    expect(tweetCount).to.equal(2); // Remember that the deleted tweet is still in the array but with a null value

    await tweetHelper
      .getTweet(0)
      .should.be.revertedWith("This tweet has been deleted.");
  });

  it("User 2 cannot delete User 1's Tweet", async function () {
    await tweetHelper
      .connect(user1)
      .createTweet("Hello, This is my first tweet.");

    await tweetHelper.connect(user2).createTweet("Hello, User2's First tweet!");
    const tweets = await tweetHelper.getTweets();
    expect(tweets.length).to.equal(2);

    await tweetHelper
      .connect(user2)
      .deleteTweet(0)
      .should.be.revertedWith("You cannot delete this tweet.");

    const tweet = await tweetHelper.getTweet(0);
    expect(tweet.content).to.equal("Hello, This is my first tweet.");
  });

  it("User cannot delete a tweet that does not exist", async function () {
    await tweetHelper
      .connect(user1)
      .createTweet("Hello, This is my first tweet.");

    await tweetHelper.connect(user2).createTweet("Hello, User2's First tweet!");
    const tweets = await tweetHelper.getTweets();
    expect(tweets.length).to.equal(2);

    await tweetHelper
      .connect(user1)
      .deleteTweet(3)
      .should.be.revertedWith("Tweet id is invalid.");
  });
});
