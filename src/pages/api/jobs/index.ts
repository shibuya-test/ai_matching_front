import type { NextApiRequest, NextApiResponse } from 'next';

// Firestoreのインポート（未実装のためコメントアウト）
// import { firestore } from '../../../lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Firestoreからデータを取得する処理（未実装のためコメントアウト）
    // const jobs = await firestore.collection('jobs').get();
    // const jobsData = jobs.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // res.status(200).json(jobsData);
    res.status(200).json({ message: 'Firestore is not implemented yet.' });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}