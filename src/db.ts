import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://jichangchun9696:jcc960720@backstage.897h1.mongodb.net/backstage', {
      serverApi: { version: '1', deprecationErrors: true }
    } as mongoose.ConnectOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;