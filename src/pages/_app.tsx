import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { GoogleTagManager } from '@next/third-parties/google'

export const queryClient = new QueryClient()
export default function App({ Component, pageProps }: AppProps) {

  return <QueryClientProvider client={queryClient}>
    <GoogleTagManager gtmId='GTM-TNSKLJP7' />
    <Component {...pageProps} />
  </QueryClientProvider>;
}
