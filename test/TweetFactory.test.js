const { expect } = require("chai");
const { ethers } = require("hardhat");
require("chai").should();

describe("TweetFactory Smart Contract", function () {
  let TweetFactory;
  let tweetFactory;
  let user1, user2;
  beforeEach(async function () {
    TweetFactory = await ethers.getContractFactory("TweetFactory");
    [user1, user2] = await ethers.getSigners();
    tweetFactory = await TweetFactory.deploy();
  });

  it("User 1 can create a Tweet", async function () {
    await tweetFactory
      .connect(user1)
      .createTweet("Hello, This is my first tweet.");
    const tweets = await tweetFactory.getTweets();
    expect(tweets.length).to.equal(1);
  });

  it("Two users can create a Tweet", async function () {
    await tweetFactory
      .connect(user1)
      .createTweet("Hello, This is my first tweet.");
    await tweetFactory.connect(user2).createTweet("Hello, I am User2.");
    const tweets = await tweetFactory.getTweets();
    expect(tweets.length).to.equal(2);
  });

  it("A user cannot create an empty tweet", async function () {
    await tweetFactory
      .connect(user1)
      .createTweet("")
      .should.be.revertedWith("Tweet content cannot be empty.");
    const tweets = await tweetFactory.getTweets();
    expect(tweets.length).to.equal(0);
  });
});
