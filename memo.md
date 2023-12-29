[MD Cheat Sheet](https://www.markdownguide.org/cheat-sheet/#basic-syntax)

1. don't forget to add the domain to Firebase authorised authentication
https://stackoverflow.com/questions/73004971/vercel-deployment-and-firebase-authentication-unable-to-customise-redirect-url?rq=2

2. Don't forget to check the console. I didn't know why it's not going as I think without checking the console. Then, it tought me that I needed to create an index for query to carry out the orderBy in Firestore. Query indexes are kinda a trap for me. I need to be careful about it. By creating the query index a few minutes ago, I solved all bugs involved with 'events' collection in Firestore. Bugs solved today were in todo.md. [link](/todo.md)

3. How to structure data in Firestore
Consider how to query before structuring
https://stackoverflow.com/questions/71000652/firestore-how-to-structure-data-the-most-efficient-way


4. Quotable API
https://github.com/lukePeavey/quotable/issues


5. Detect a key is in the object
```console.log('authorSlug' in q)```