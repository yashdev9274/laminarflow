import BackRedirectButton from "@/app/components/backRedirectButton"
import Footer from "@/components/home/footer"
import { Bell } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Author {
   name: string
   avatar: string
   date: string
 }
 
 interface BlogPost {
   id: string
   title: string
   image: string
   categories: Categories
   label?: string
   author: Author
 }

interface Categories{
   id: string,
   name: string,
   href: string,
}


export default function Blogs(){


   const blogPosts: BlogPost[] = [
      {
        id: "1",
        title: "LaminarFlow Launch",
        image: "/banner-2.png",
        categories: {
            id: "company",
            name: "Company",
            href: "/blog/company/laminarflow-launch/",
        },
        author: {
          name: "Yash Dewasthale",
          avatar: "/pfp.png",
          date: "Apr 23, 2025",
        },
      },
      {
        id: "2",
        title: "How to warm up a new domain",
        image: "/banner-2.png",
        categories: {
            id: "education",
            name: "Education",
            href: "/blog/company",
        },
        label: "Guide",
        author: {
          name: "Yash Dewasthale",
          avatar: "/pfp.png",
          date: "Apr 18, 2025",
        },
      },
    ];

    const categories =[
      {id: "blog", name:"All", href:"/blog"},
      {id: "company", name:"Company", href:"/blog/company"},
      {id: "education", name:"Education", href:"/blog/education"},
    ];
   return(
      <div className="min-h-screen bg-black text-white px-4 py-12 md:px-8 lg:px-12">
         
         <div>
            <header className="absolute left-4 top-4 md:left-8 md:top-8">
                  <div className="flex justify-between items-center container">                    
                     <BackRedirectButton text="Back" href = "/blog"/>
                  </div>
            </header>
         </div>

         <div className="max-w-7xl mx-auto py-11">
            {/* Header */}
            <div className="flex justify-between items-center mb-16">
               <h1 className="text-5xl font-bold">Blog</h1>
               <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 hover:bg-gray-900 transition-colors">
                  <Bell size={16} />
                  <span>Subscribe</span>
               </button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 mb-12">
               {categories.map((categories) => (
                  
                  <Link
                     key={categories.id} href={`/blog/${categories.id}`} passHref
                  >
                     <button
                     className={`px-4 py-2 rounded border border-[#565555] text-sm font-medium transition-colors ${
                        categories.name === "Company" ? "bg-white text-black" : "bg-neutral-800 text-white hover:bg-black"
                     }`}
                     >
                     {categories.name}
                     </button>
                  </Link>
               ))}
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {blogPosts.map((post) => (
                  <Link key={post.id} href={post.categories.href} className="group">
                  <div className="relative overflow-hidden rounded-xl aspect-[16/9] mb-4">
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                     <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                     />

                     {post.id === "resend-acquires-mergent" && (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="flex items-center gap-4">
                           <span className="text-4xl font-bold">Resend</span>
                           <span className="text-4xl font-bold">+</span>
                           <span className="text-4xl font-bold">Mergent</span>
                        </div>
                        </div>
                     )}

                     {post.label && (
                        <div className="absolute top-4 right-4 z-20">
                        <span className="px-3 py-1 bg-black/70 rounded-full text-xs">{post.label}</span>
                        </div>
                     )}

                     {post.id === "how-to-warm-up-domain" && (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="w-24 h-24 rounded-2xl bg-gray-800/80 flex items-center justify-center">
                           <div className="w-16 h-16 rounded-xl bg-gray-700/80 flex items-center justify-center">
                              <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="20"
                                 height="20"
                                 viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor"
                                 strokeWidth="2"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                              >
                                 <rect width="20" height="16" x="2" y="4" rx="2" />
                                 <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                              </svg>
                              </div>
                           </div>
                        </div>
                        </div>
                     )}
                  </div>

                  <h2 className="text-2xl font-bold mb-3">{post.title}</h2>

                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                        src={post.author.avatar || "/placeholder.svg"}
                        alt={post.author.name}
                        width={32}
                        height={32}
                        className="object-cover"
                        />
                     </div>
                     <span className="text-gray-400">{post.author.name}</span>
                     <span className="text-gray-500">•</span>
                     <span className="text-gray-400">{post.author.date}</span>
                  </div>
                  </Link>
               ))}
            </div>
         </div>

         <Footer/>
    </div>
   )
}