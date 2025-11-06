'use client';

export default function Home() {
  return (
    <div className="relative bg-black min-h-screen overflow-hidden">

      {/* Background circles */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500 opacity-30 rounded-full blur-3xl animate-pulse-slow -translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-400 opacity-20 rounded-full blur-3xl animate-pulse-slow translate-x-1/4 translate-y-1/4"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row w-full h-full px-8 py-4">

        {/* Left Column */}
        <div className="w-full md:w-1/2 flex flex-col justify-start mt-20 md:mt-32 md:ml-0">
          
          {/* Heading */}
          <h1 className="text-6xl font-bold leading-snug">
            <span className="text-white">Code Together. </span> <br />
            <span className="text-blue-400">Build Faster. </span> <br />
            <span className="text-white">With AI Power.</span>
          </h1>

          <br />

          {/* Subheading */}
          <h2 className="leading-relaxed">
            <span className="text-white">Real-time code synchronization, AI-powered suggestions, and </span> <br />
            <span className="text-white">seamless team collaboration. Everything you need to build amazing</span> <br />
            <span className="text-white">projects together.</span>
          </h2>

          {/* Buttons with thin line below */}
          <div className="flex flex-col mt-6">
            <div className="flex space-x-4">
              <button className="bg-blue-500 text-white px-6 py-3 text-xl rounded-lg md:rounded-xl transform transition-transform duration-300 ease-in-out hover:scale-105">
                Start Building
              </button>
             <button className="bg-black text-blue-400 border text-xl border-blue-400 px-6 py-3 rounded-lg md:rounded-xl transform transition-transform duration-300 ease-in-out hover:scale-105">
                Learn More
            </button>
            </div>

            {/* Thin line below buttons */}
            <div className="h-[0.06px] bg-blue-400 mt-8 w-full"></div>
          </div>

          {/* Stats section */}
          <div className="flex mt-[30px] justify-start space-x-30">
            
            {/* Column 1 */}
            <div className="flex flex-col items-center">
              <h1 className="text-4xl text-blue-400 font-bold">50K+</h1>
              <h2 className="text-sm text-blue-400 font-bold mt-1">Users</h2>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col items-center">
              <h1 className="text-4xl text-blue-400 font-bold">10K+</h1>
              <h2 className="text-sm text-blue-400 font-bold mt-1">Projects</h2>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col items-center">
              <h1 className="text-4xl text-blue-400 font-bold">100+</h1>
              <h2 className="text-sm text-blue-400 font-bold mt-1">Languages</h2>
            </div>

          </div>
        </div>











      {/* Right Column */}
<div className="w-full md:w-1/2 flex items-start justify-end mt-8 md:mt-18 md:mr-5">
  {/* Right rectangle */}
  <div className="w-[530px] h-[610px] border border-blue-400 rounded-3xl relative">

    {/* White button inside the rectangle */}
    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex justify-center items-center w-[150px] h-[30px] bg-blue-400 rounded-full text-xs">
      Start Coding Now
    </div>

    {/* Join room text below the button */}
    <div className="absolute top-[90px] left-1/2 transform -translate-x-1/2 text-white text-4xl">
      Join Room
    </div>

     {/* Start collaborating with your team instantly text below the button */}
    <div className="absolute top-[135px] left-1/2 transform -translate-x-1/2 text-gray-400 text-sm">
      Start collaborating with your team instantly
    </div>

    {/* Room ID */}
<div className="absolute top-[190px] left-1/7 transform -translate-x-1/2 text-gray-400 text-sm">
  Room ID </div>
  {/* Placeholder / input box */}
  <div className="absolute mt-7 w-[450px] left-1/12 top-[187px] h-[50px] border border-gray-500 rounded px-2 text-gray-200 flex items-center">
    Enter your Room ID
  </div>


{/* Username */}
<div className="absolute top-[280px] left-1/7 transform -translate-x-1/2 text-gray-400 text-sm">
  Username </div>
  {/* Placeholder / input box */}
  <div className="absolute mt-7 w-[450px] left-1/12 top-[280px] h-[50px] border border-gray-500 rounded px-2 text-gray-200 flex items-center">
    Enter your Username
  </div>

{/* Join Room button */}
<button className="absolute flex justify-center items-center bg-blue-400 mt-95 w-[450px] h-[50px] left-1/12 text-white border text-xl border-blue-400 px-6 py-3 rounded-lg md:rounded-xl transform transition-transform duration-300 ease-in-out hover:scale-105">
  Join Room
</button>

{/* Horizontal divider with OR */}
<div className="absolute flex items-center w-[450px] left-1/12 mt-[450px]">
  {/* Left line */}
  <div className="flex-1 h-[0.06px] bg-blue-400"></div>
  
  {/* OR text */}
  <span className="mx-2 text-blue-400 text-sm">or</span>
  
  {/* Right line */}
  <div className="flex-1 h-[0.06px] bg-blue-400"></div>
</div>

{/* Create New Room button */}
<button className="absolute flex justify-center items-center bg-blue-400 mt-122 w-[450px] h-[50px] left-1/12 text-white border text-xl border-blue-400 px-6 py-3 rounded-lg md:rounded-xl transform transition-transform duration-300 ease-in-out hover:scale-105">
  Create New Room
</button>



  </div>
</div>



      </div>
    </div>
  );
}
