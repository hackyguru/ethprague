import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient";
import { Calculator, Replace, Search, ShieldCheck, Sprout, X } from "lucide-react";
import { useState } from "react";
import { MultiStepLoader } from "@/components/ui/multistep-loader";
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

  const [loading, setLoading] = useState(true);

  return (

    <main className=''>
      <BackgroundGradientAnimation>
        {loading ?
          <div className="absolute z-50 w-full min-h-screen">

            <div className="flex justify-between p-5 items-center">
              <div className="outfit text-3xl space-x-2 flex items-center">
                <Sprout className="text-[#e3f568] h-8 w-8" />
                <h1>Riverdi</h1>
              </div>
              <Button variant="glass">Connect wallet</Button>
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
              <Button variant="glass">Connect wallet</Button>
            </div>
            <div className="p-10 w-full">
              <div className="flex justify-between w-full space-x-5">
                <div className="w-1/2">

                  <div className="bg-clip-padding flex w-full justify-between backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-400 p-6 rounded-md">
                    <div className="space-y-5">
                      <h1>Your wallet</h1>
                      <h1 className="text-6xl bebas">0x...abc</h1>
                    </div>
                    <div className="w-80 bg-gradient-to-r from-cyan-500 to-green-500 bg-opacity-30 rounded-lg">
                      <h1>Your</h1>
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="bg-clip-padding h-80 flex w-full justify-between backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-400 p-6 rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Volume</TableHead>
                          <TableHead>Power</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Total kW</TableHead>
                        </TableRow>
                      </TableHeader>
                      <marquee className="" width direction="down">
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
                      </marquee>
                    </Table>
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
