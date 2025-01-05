import React from "react";

import ButtonLogin from "@/components/ButtonLogin";
import { Example } from "@/components/Example";
import FAQListItem from "@/components/FAQListItem";
import Image from "next/image";
import productDemo from "@/app/productDemo.jpeg";
import clientPromise from "@/libs/mongo";

export default function Home() {
const isLoggedIn = true; 
const name = "Kylie";

// clientPromise.db.collection("users").find({age:32});


return (
  <main>

  {/* HEADER */}
  <section className="bg-base-200">
    <div className="max-w-3xl mx-auto flex justify-between items-center px-8 py-2">
      <div className="font-bold">TheAI</div>
      <div className="space-x-4 max-md:hidden">
        <a className="link link-hover" href="/#pricing">Pricing</a>
  <a className="link link-hover" href="#faq">FAQ</a>
      </div>
      <div>
        <ButtonLogin isLoggedIn={isLoggedIn} name={name} />
      </div>
    </div>
  </section>


{/* HERO */}
<section className="py-32 px-8 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-14">
<Image src = {productDemo} alt="product demo" className="w-96 rounded-xl" />

<div className="flex flex-col items-start lg:items-start">
     <h1 className="text-4xl font-extrabold mb-6">Collect customer feedback </h1>
     <div className="opacity-90 mb-10"> Create a feedback board in minutes , prioritize features , and build products your customers will love</div>
     <ButtonLogin isLoggedIn={isLoggedIn} name= {name}/>
     </div>
</section>


{/* PRICING */}
<section id="pricing" className="bg-base-200 py-16">
 <div className="max-w-5xl mx-auto px-8">
   <div className="text-center mb-12">
     <p className="text-3xl lg:text-4xl font-extrabold mb-4 text-gray-800">
       Pricing
     </p>
     <h2 className="text-xl text-gray-600">
       A pricing that adapts to your needs
     </h2>
   </div>

   <div className="flex gap-8 justify-center flex-wrap">
     {/* Basic Plan */}
     <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-80">
       <div className="p-6 border-b border-gray-200">
         <div className="space-y-2">
           <h3 className="text-xl font-bold text-gray-900">Basic Plan</h3>
           <p className="text-gray-500 text-sm">For small projects</p>
           <div className="flex items-baseline">
             <span className="text-4xl font-bold text-gray-900">₹580</span>
             <span className="text-gray-500 text-sm font-medium ml-1">/month</span>
           </div>
         </div>
       </div>

       <div className="p-6 bg-gray-50">
         <ul className="space-y-3">
           <li className="flex gap-2 items-center">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-green-600 w-5 h-5">
               <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
             </svg>
             <span className="text-gray-600 text-sm">Collect customer feedback</span>
           </li>
           <li className="flex gap-2 items-center">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-green-600 w-5 h-5">
               <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
             </svg>
             <span className="text-gray-600 text-sm">Unlimited boards</span>
           </li>
         </ul>

         <button className="mt-6 w-full bg-black text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
           Get started
         </button>
       </div>
     </div>

     {/* Pro Plan */}
     <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-80">
       <div className="p-6 border-b border-gray-200">
         <div className="space-y-2">
           <h3 className="text-xl font-bold text-gray-900">Pro Plan</h3>
           <p className="text-gray-500 text-sm">For growing businesses</p>
           <div className="flex items-baseline">
             <span className="text-4xl font-bold text-gray-900">₹950</span>
             <span className="text-gray-500 text-sm font-medium ml-1">/month</span>
           </div>
         </div>
       </div>

       <div className="p-6 bg-gray-50">
         <ul className="space-y-3">
           <li className="flex gap-2 items-center">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-green-600 w-5 h-5">
               <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
             </svg>
             <span className="text-gray-600 text-sm">Everything in Basic</span>
           </li>
           <li className="flex gap-2 items-center">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-green-600 w-5 h-5">
               <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
             </svg>
             <span className="text-gray-600 text-sm">Advanced analytics</span>
           </li>
           <li className="flex gap-2 items-center">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-green-600 w-5 h-5">
               <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
             </svg>
             <span className="text-gray-600 text-sm">Priority support</span>
           </li>
         </ul>

         <button className="mt-6 w-full bg-black text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
           Get started
         </button>

         {/* <ButtonLogin isLoggedIn = {isLoggedIn} name={name} extraStyle= "w-full"></ButtonLogin> */}
       </div>
     </div>
   </div>
 </div>
</section>

{/* FAQ */}
<section id="faq" className="bg-base-200">
  <div className="py-32 px-8 max-w-3xl mx-auto">
    <p className="text-sm uppercase font-medium text-center text-purple-600">
      FAQ
    </p>
    <h2 className="text-4xl lg:text-6xl font-bold text-center mt-4 mb-8">
      Frequently Asked Questions
    </h2>

    <ul className="max-w-lg mx-auto">
      {[
        {
          question: "What do I get exactly?",
          answer: "Lorem ipsum"
        },
        {
          question: "Can I get a refund?",
          answer: "Lorem ipsum"
        },
        {
          question: "I have another question",
          answer: "Lorem ipsum"
        }
      ].map((qa) => (
        <FAQListItem key={qa.question} qa={qa} />
      ))}
    </ul>
  </div>
</section>

<Example/>

</main>
  );
}