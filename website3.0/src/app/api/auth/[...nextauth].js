import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
const handler= NextAuth({
providers:[
    GoogleProvider({
        clientId: "1009178233228-jopc46u2807021eq8ujree0h01kje260.apps.googleusercontent.com",
        clientSecret: "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"
      })
]
})
export { handler as GET, handler as POST }
