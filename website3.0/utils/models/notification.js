import mongoose from 'mongoose';

const notificationModel = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  followerList: {
    type: Map,
    of: {
      dateTime: {
        type: Date,
        default: Date.now
      }
    }
  },
  blogList: {
    type: Map,
    of: {
      dateTime: {
        type: Date,
        default: Date.now
      }
    }
  }
});

const Notifications = mongoose.models.notifications || mongoose.model("notifications", notificationModel);

export default Notifications;
