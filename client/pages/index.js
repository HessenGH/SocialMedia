import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useContext } from "react";
import { UserContext } from "../context";
import styles from "../styles/Home.module.css";
import Layout from '@/components/Layout'
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [state, setState] = useContext(UserContext);
  return (
    <Layout>
    <h1 className="text-success">My App</h1>
    <h1>{JSON.stringify(state)}</h1>
  </Layout>
  )
}
