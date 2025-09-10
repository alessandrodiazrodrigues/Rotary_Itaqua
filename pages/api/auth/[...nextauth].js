// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const emailsAutorizados = [
        'cvcalessandro@gmail.com',
      ];
      
      return emailsAutorizados.includes(user.email);
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      
      if (session.user.email === 'cvcalessandro@gmail.com') {
        session.user.role = 'admin';
      } else {
        session.user.role = 'companheiro';
      }
      
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  }
})
