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
      },
      isRead: {
        type: Boolean,
        default: false
      }
    }
  },
  blogList: {
    type: Map,
    of: {
      dateTime: {
        type: Date,
        default: Date.now
      },
      isRead: {
        type: Boolean,
        default: false
      }
    }
  },
  blogCommentList:{
    type: Map,
    of: {
      dateTime: {
        type: Date,
        default: Date.now
      },
      isRead: {
        type: Boolean,
        default: false
      },
      blogId:{
        type:String,
        default:''
      },
      blogName:{
        type:String,default:''
      }
    }
  }
});

const Notifications = mongoose.models.notifications || mongoose.model("notifications", notificationModel);

export default Notifications;
