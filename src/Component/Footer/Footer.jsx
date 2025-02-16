import React from "react";
import amazonPayment from "../../assets/images/amazon-pay.png";
import mastercard from "../../assets/images/mastercard.webp";
import paypal from "../../assets/images/paypal.png";
import amricanExpress from "../../assets/images/American-Express-Color.png";
import appleStore from "../../assets/images/get-apple-store.png";
import googleplay from "../../assets/images/get-google-play.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-100 absolute bottom-0 left-0 right-0">
        <div className="container pt-8">
          <div className="">
            <p className="text-xl ">GET THE FRESHCART APP</p>
            <p className="text-gray-400 py-2">
              We will send you a link,open it on your phone to download the app.
            </p>
          </div>
          <div className="pb-4 flex gap-4">
            <input
              type="text"
              placeholder="Email .."
              className="form-control flex-grow "
            />
            <button className="btn-primary ">Share App Link</button>
          </div>
          <hr />
          <div className="flex flex-col lg:flex-row lg:justify-between py-3">
            <div className="flex items-center gap-3">
              <p>Payment parteners :</p>
              <img className="w-14" src={mastercard} />
              <img className="w-14" src={amazonPayment} />
              <img className="w-14" src={paypal} />
              <img className="w-14" src={amricanExpress} />
            </div>
            <div className="flex items-center gap-3">
              <p>Get delivers with Freshcart :</p>
              <img className="w-24" src={appleStore} />
              <img className="w-24" src={googleplay} />
            </div>
          </div>
          <hr />
        </div>
      </footer>
    </>
  );
}
