import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient";
import { BatteryCharging, Calculator, Coffee, Fan, Replace, Search, ShieldCheck, Sprout, X } from "lucide-react";
import { useState } from "react";
import { MultiStepLoader } from "@/components/ui/multistep-loader";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RadialBarChart, RadialBar } from 'recharts';
import { Web3Modal } from "@/context";

import { useWeb3Modal } from '@web3modal/ethers/react'
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'


import { useEffect } from "react";
import { config } from '@/config'
import Web3ModalProvider from '@/context'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Marquee from "react-fast-marquee";
import { Progress } from "@/components/ui/progress";


export default function Home() {

  
  const loadingStates = [
    {
      text: "Validating the Ethereum address",
    },
    {
      text: "Fetching data from TheGraph Substreams",
    },
    {
      text: "Fetching data from Alchemy",
    },
    {
      text: "Calculating the energy usage",
    },
    {
      text: "Visualizing the data",
    },
  ];

  const { open } = useWeb3Modal()
  const { address, chainId, isConnected } = useWeb3ModalAccount()


  const radialdata = [
    {
      name: '18-24',
      uv: 31.47,
      pv: 2400,
      fill: '#8884d8',
    },
    {
      name: '25-29',
      uv: 26.69,
      pv: 4567,
      fill: '#83a6ed',
    },
    {
      name: '30-34',
      uv: 15.69,
      pv: 1398,
      fill: '#8dd1e1',
    },
    {
      name: '35-39',
      uv: 8.22,
      pv: 9800,
      fill: '#82ca9d',
    },
    {
      name: '40-49',
      uv: 8.63,
      pv: 3908,
      fill: '#a4de6c',
    },
    {
      name: '50+',
      uv: 2.63,
      pv: 4800,
      fill: '#d0ed57',
    },
    {
      name: 'unknow',
      uv: 6.67,
      pv: 4800,
      fill: '#ffc658',
    },
  ];
  
  const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(isConnected == true){
      setLoading(true)
    }
  }, [isConnected])
  


  return (

    <main className=''>
      <BackgroundGradientAnimation>
        {!loading && !isConnected ?
          <div className="absolute z-50 w-full min-h-screen">

            <div className="flex justify-between p-5 items-center">
              <div className="outfit text-3xl space-x-2 flex items-center">
                <Sprout className="text-[#e3f568] h-8 w-8" />
                <h1>Riverdi</h1>
              </div>
              <Button onClick={() => {open()}} variant="glass">{!isConnected ? "Connect wallet" : `Connected to 0x...${address.slice(-4)}`}</Button>
            </div>
            <div className="text-center mt-20 space-y-10">
              <h1 className="bebas text-9xl">Is your wallet debted
                <br />
                to the environment?
              </h1>
            </div>
            <div className="flex mt-20 justify-center z-50">
              <div className="flex w-full max-w-4xl items-center space-x-2">
                <Input className="text-lg p-6" placeholder="Enter a wallet address" />
                <Button onClick={() => { setLoading(true) }} className="p-6" variant="primary" type="submit">
                  <Search />
                </Button>
              </div>
            </div>
            <div className="flex space-x-20 justify-center h-32 mt-20">
              <div className="rounded-md text-stone-800 p-4 bg-[#e3f568] w-60 space-y-4">
                <div className="flex space-x-2 items-center">
                  <Calculator />
                  <h1 className=" text-left outfit">Energy calculation</h1>
                </div>
                <h3 className="text-left text-xs">Calculate your energy usage using publicly available on-chain data fetched from TheGraph</h3>
                <h2></h2>
              </div>
              <div className="rounded-md text-stone-800 p-4 bg-[#e3f568] w-60 space-y-4">
                <div className="flex space-x-2 items-center">
                  <ShieldCheck />
                  <h1 className=" text-left outfit">Reputation</h1>
                </div>
                <h3 className="text-left text-xs">Increase your onchain reputation by credentializing your energy and sustainability scores</h3>
                <h2></h2>
              </div>
              <div className="rounded-md text-stone-800 p-4 bg-[#e3f568] w-60 space-y-4">
                <div className="flex space-x-2 items-center">
                  <Replace />
                  <h1 className=" text-left outfit">Public offsetting</h1>
                </div>
                <h3 className="text-left text-xs">Offset your energy usage towards impactful public goods funding that contribute to sustainable goals</h3>
                <h2></h2>
              </div>
            </div>
          </div>
          :
          <div className="absolute z-50 w-full min-h-screen">
            <div className="flex justify-between p-5 items-center">
              <div className="outfit text-3xl space-x-2 flex items-center">
                <Sprout className="text-[#e3f568] h-8 w-8" />
                <h1>Riverdi</h1>
              </div>
              <Button onClick={() => open()} variant="glass">{`Connected to 0x...${address.slice(-4)}`}</Button>
            </div>
            <div className="p-10 w-full">
              <div className="flex justify-between w-full space-x-5">
                <div className="w-1/2">

                  <div className="bg-clip-padding flex w-full justify-between backdrop-filter backdrop-blur-xl bg-opacity-5 bg-white border border-gray-400 p-6 rounded-md">
                    <div className="space-y-5">
                      <h1>Your wallet</h1>
                      <h1 className="text-6xl bebas">0x...{address.slice(-4)}</h1>
                    </div>
                    <div className="w-80 p-3 items-end flex justify-between bg-gradient-to-r from-green-500 to-[#e3f568] bg-opacity-30 rounded-lg">
                      <div>
                        <h1>Offset left</h1>
                        <h1 className="bebas mt-2 text-5xl">5959</h1>
                      </div>
                      <div className="">
                        <Button variant="secondary">Offset more</Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-clip-padding mt-8 h-72 backdrop-filter backdrop-blur-xl bg-opacity-5 bg-white border border-gray-400 p-6 rounded-md">
                    <h1>Energy usage</h1>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart width={300} height={100} data={data}>
                        <Line type="monotone" dataKey="pv" stroke="#e3f568" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-clip-padding mt-10 h-72 backdrop-filter backdrop-blur-xl bg-opacity-5 bg-white border border-gray-400 p-6 rounded-md">
                    <h1>Your energy usage comparisons</h1>
              <Marquee pauseOnHover="true">
                    <div className="flex mt-10 space-x-5">

              <div className="rounded-md text-stone-800 p-4 bg-[#e3f568] w-60 space-y-4">
                <div className="flex space-x-2 items-center">
                  <Fan />
                </div>
                <h3 className="text-left text-xs">Running a ceiling fan for 60 minutes non-stop</h3>
                <h2></h2>
              </div>
              <div className="rounded-md text-stone-800 p-4 bg-[#e3f568] w-60 space-y-4">
                <div className="flex space-x-2 items-center">
                  <BatteryCharging />
                </div>
                <h3 className="text-left text-xs">Charging a 3000mAH smart phone for 8 minutes</h3>
                <h2></h2>
              </div>
              <div className="rounded-md text-stone-800 p-4 bg-[#e3f568] w-60 space-y-4">
                <div className="flex space-x-2 items-center">
                  <Coffee />
               </div>
                <h3 className="text-left text-xs">Powering a coffee machine for brewing 1 glass of coffee</h3>
                <h2></h2>
              </div>
                    </div>
              </Marquee>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="bg-clip-padding h-80 backdrop-filter backdrop-blur-xl bg-opacity-5 bg-white border border-gray-400 p-6 rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Volume</TableHead>
                          <TableHead>Power</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Total kW</TableHead>
                        </TableRow>
                      </TableHeader>
                    </Table>
                    <marquee scrollamount="3" className="w-full h-60" direction="down">
                      <Table>
                        <TableBody>
                          <TableRow className="w-full">
                            <TableCell className="font-medium">100</TableCell>
                            <TableCell>0.002</TableCell>
                            <TableCell>ERC20 Transactions</TableCell>
                            <TableCell className="text-right">0.2</TableCell>
                          </TableRow>
                          <TableRow className="w-full">
                            <TableCell className="font-medium">1</TableCell>
                            <TableCell>0.002</TableCell>
                            <TableCell>ERC721 Transactions</TableCell>
                            <TableCell className="text-right">0.002</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </marquee>
                  </div>
                  <div className="w-full flex space-x-10">
                    <div className="w-1/2 space-y-2 mt-10 bg-clip-padding  backdrop-filter backdrop-blur-xl bg-opacity-5 bg-white border border-gray-400 p-6 rounded-md">
                      <div className="bg-clip-padding flex justify-between items-center backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-[#e3f568] bg-[#e3f568] border border-opacity-40 border-[#e3f568] p-6 rounded-md">
                        <h1>Offseted</h1>
                        <h1 className="bebas text-4xl">12</h1>
                      </div>
                      <div className="bg-clip-padding flex justify-between items-center backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-orange-400 bg-orange-500 border border-opacity-40 border-orange-500 p-6 rounded-md">
                        <h1>Usage</h1>
                        <h1 className="bebas text-4xl">12</h1>
                      </div>
                    </div>
                    <div className="w-1/2 mt-10 h-60 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-5 bg-white border border-gray-400 p-6 rounded-md">

                      <div className="mb-5 flex justify-between items-center">
                        <h1>Offseting goals</h1>
                        <h1 className="bebas text-3xl">35/100</h1>
                      </div>
                      <Progress value={51} />
                      <div className="bg-clip-padding mt-6 flex justify-between items-center backdrop-filter backdrop-blur-xl bg-opacity-5 shadow-white bg-white border border-opacity-40 border-white p-6 rounded-md">
                        <h1>Offsetted USDC</h1>
                        <h1 className="bebas text-4xl">12</h1>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 space-y-5 h-40 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-5 bg-white border border-gray-400 p-6 rounded-md">
                    <div className="flex justify-center mt-3">
                      <Button variant="primary" className="bebas text-3xl" onClick={mintNFT}>MINT SOULBOUND NFT</Button>
                    </div>
                    <h3 className="text-center text-stone-300">Mint a dynamic soulbound NFT to credentialize your reputation on-chain</h3>
                  </div>

                </div>
              </div>
            </div>
          </div>
        }

        <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={2000} />

        {loading && (
          <button
            className="fixed top-4 right-4 text-black dark:text-white z-[120]"
            onClick={() => setLoading(false)}
          >
            <X className="h-10 w-10" />
          </button>
        )}
      </BackgroundGradientAnimation>
    </main>
  );
}
