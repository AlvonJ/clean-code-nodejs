import { client } from '../index.js';

export async function getAllCallPersistence({ limit, page }: { limit: number; page: number }) {
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db('clean-architecture');
    const callsCollection = db.collection('calls');

    const cursor = callsCollection
      .find({})
      .limit(+limit)
      .skip((page - 1) * limit);

    const result = await cursor.toArray();

    await cursor.close();

    return result;
  } catch (err) {
    throw new Error(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
