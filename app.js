const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
import cookieSession from "cookie-session";
import "@babel/polyfill";
import passport from "passport";

import socialAuthRoutes from "./routes/socialAuthRoutes";
import { getSearch } from "./controllers/v1/search";

// ROUTES
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");
const jobsRoutes = require("./routes/jobsRoutes");
const projectRoutes = require("./routes/projectRoutes");
const eventRoutes = require("./routes/eventRoutes");
const mentorRoutes = require("./routes/mentorRoutes");
const menteeRoutes = require("./routes/menteeRoutes");
const mentorshipRoutes = require("./routes/mentorShip");
const startupRoutes = require("./routes/startup");
const locationRoutes = require("./routes/locationRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const chapterStatsRoutes = require("./routes/chapterRouters");
const fundedRoutes = require("./routes/fundedRoutes");
const minorityEarnedRoutes = require("./routes/minority_earnedRoutes");
const proposalRoutes = require("./routes/proposalRoutes");
const proposalStatusRoutes = require("./routes/proposalStatusRoutes");
const proposalViewRoutes = require("./routes/proposalViews");
const chapterRoutes = require("./routes/chapter");
const socialRoutes = require("./routes/socialAuthRoutes");
const savedEventsRoutes = require("./routes/savedEventsRoutes");
const savedJobsRoutes = require("./routes/savedJobsRoutes");
const companiesRoutes = require("./routes/companiesRouters");
const chapterToolKitRoutes = require("./routes/chapterToolKit");
const joinChapterRoutes = require("./routes/joinChapterRoutes");
const chatRoutes = require("./routes/chatRoutes");
const chatMessageRoutes = require("./routes/chatMessageRoutes");
const learnRoutes = require("./routes/learnRoutes");
const easyApplyRoutes = require("./routes/easyApplyRoutes");
const claimedProjects = require("./routes/claimedProjects");
const upvotes = require("./routes/upvotes");
const downvotes = require("./routes/downVotes");
const walletRouters = require("./routes/walletRouters");
const notificationsRouters = require("./routes/notifications");
const sidebarMenuRouters = require("./routes/SidebarMenu");
const childLinksRoutes = require("./routes/childLinks");
const suggestionsRoutes = require("./routes/suggestionsRoutes");
const certificateRoutes = require("./routes/certificate");

const app = express();

if (process.env === "development") {
  app.use(morgan("dev"));
}

// Implement Cors
app.use(cors());
app.options("*", cors());

app.use(
  cookieSession({
    // milliseconds of a day
    maxAge: 24 * 60 * 60 * 1000,
    keys: 12345678
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("working");
  res.status(200);
});

app.use(socialAuthRoutes);

// INITIALIZE ROUTES
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/subscribe", subscriberRoutes);
app.use("/api/v1/job", jobsRoutes);
app.use("/api/v1/project", projectRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/mentor", mentorRoutes);
app.use("/api/v1/mentee", menteeRoutes);
app.use("/api/v1/mentorship", mentorshipRoutes);
app.use("/api/v1/startup", startupRoutes);
app.use("/api/v1/location", locationRoutes);
app.use("/api/v1/service", serviceRoutes);
app.use("/api/v1/chapter_stats", chapterStatsRoutes);
app.use("/api/v1/funded", fundedRoutes);
app.use("/api/v1/minority_earned", minorityEarnedRoutes);
app.use("/api/v1/proposal", proposalRoutes);
app.use("/api/v1/chapter", chapterRoutes);
app.use("/api/v1/saveEvent", savedEventsRoutes);
app.use("/api/v1/saveJob", savedJobsRoutes);
app.use("/api/v1/company", companiesRoutes);
app.use("/api/v1/chapterToolKit", chapterToolKitRoutes);
app.use("/api/v1/joinChapter", joinChapterRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/chat_message", chatMessageRoutes);
app.use("/api/v1/learn", learnRoutes);
app.post("/api/v1/search", getSearch);
app.use("/api/v1/easyApply", easyApplyRoutes);
app.use("/api/v1/claimProject", claimedProjects);
app.use("/api/v1/upVotes", upvotes);
app.use("/api/v1/downVotes", downvotes);
app.use("/api/v1/proposalStatus", proposalStatusRoutes);
app.use("/api/v1/proposalViews", proposalViewRoutes);
app.use("/api/v1/wallets", walletRouters);
app.use("/api/v1/notification", notificationsRouters);
app.use("/", socialRoutes);
app.use("/api/v1/sidebarmenu", sidebarMenuRouters);
app.use("/api/v1/childlink", childLinksRoutes);
app.use("/api/v1/suggestions", suggestionsRoutes);
app.use("/api/v1/certificate", certificateRoutes);

app.use((req, res, next) => {
  const error = new Error("endpoint Not found...");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})


module.exports = app;
