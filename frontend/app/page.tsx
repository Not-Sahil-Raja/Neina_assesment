import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <section className=" h-screen pt-24 px-4 pb-5">
          <div className=" relative rounded w-full overflow-hidden h-full bg-red-200">
            <img
              src="https://images.unsplash.com/photo-1535400255456-984241443b29?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="hero-section-image"
              className=" w-full h-full object-cover"
            />
            <h1 className=" absolute top-12 left-1/2 -translate-x-1/2 z-[1] text-white md:text-8xl text-5xl text-center">
              Welcome to Hot Plate
            </h1>
            <Link
              href="/reservation"
              className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[1] md:text-3xl text-2xl underline text-white py-2 px-4 "
            >
              Book A Table
            </Link>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-60" />
          </div>
        </section>
      </main>
    </div>
  );
}
