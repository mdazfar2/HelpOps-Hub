import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
const handler= NextAuth({
providers:[
    GoogleProvider({
        clientId: process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET
      })
],
pages:{
    signIn:"/createaccount"
}
})
export { handler as GET, handler as POST }
