import { NavLink } from "react-router";
import SectionPage from "./components/SectionPage";
import { buttonVariants } from "./components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "./components/ui/card";

const App = () => {

	const homeSectionCarousel = [
		{
			titleHeading: "Welcome to our",
			title: "Helix University",
			description: "A university that provides a wide range of courses in various fields. We offer both undergraduate and graduate programs.",
			image: "https://tinyurl.com/mwb88ey3",
			links: [
				{
					title: "Explore Courses",
					link: "/academics/courses",
					className: buttonVariants({ size: "lg", variant: "blue" })
				},
				{
					title: "About Us",
					link: "/about-us",
					className: buttonVariants({ size: "lg", variant: "default" })
				},
			]
		},
		{
			titleHeading: "Discover our",
			title: "World-Class Faculty",
			description: "Learn from experienced professors and industry experts who are passionate about education and research.",
			image: "https://tinyurl.com/yevnkca7",
			links: [
				{
					title: "Meet the Faculty",
					link: "/academics/teachers",
					className: buttonVariants({ size: "lg", variant: "blue" })
				},
				// {
				// 	title: "Research Opportunities",
				// 	link: "/research",
				// 	className: buttonVariants({ size: "lg", variant: "default" })
				// },
			]
		},
		{
			titleHeading: "Join our",
			title: "Vibrant Campus Life",
			description: "Get involved in student clubs, events, and campus traditions that make your university experience unforgettable.",
			image: "https://tinyurl.com/3mzx2fm2",
			links: [
				{
					title: "Campus Life",
					link: "/campus-life",
					className: buttonVariants({ size: "lg", variant: "blue" })
				},
				{
					title: "Student Clubs",
					link: "/campus-life/clubs",
					className: buttonVariants({ size: "lg", variant: "default" })
				},
			]
		}
	];


	return(
		<section className="w-full min-h-screen block" id="home-page">

			{/* home */}
			<SectionPage
				id="home"
				sectionClassName="!pt-12"
				containerClassName="h-[80vh] lg:h-[90vh]"
			>
				<div className="w-full h-full">
					<Carousel
						plugins={[
							Autoplay({
								delay: 3000,
								stopOnInteraction: false,
							})
						]}
					>
						<CarouselContent className="h-[80vh] lg:h-[80vh]">
							{
								homeSectionCarousel.map((item, index) => (
									<CarouselItem className="h-full" key={index}>
										<div className="relative h-full rounded-md overflow-hidden">
											{/* background image */}
											<img src={item.image} alt="carousel" className="w-full h-full object-cover object-center" />

											{/* info */}
											<div className="absolute w-full h-full top-0 left-0 bg-black/50 p-8 lg:p-14 xl:p-20 flex items-center">
												<div>
													<h4 className="text-white text-xl font-medium pb-3">{item.titleHeading}</h4>
													<h2 className="text-white text-5xl xl:text-8xl font-bold pb-4">{item.title}</h2>
													<p className="text-white text-base w-full max-w-[600px]">{item.description}</p>
													<div className="flex gap-4 mt-5">
														{item.links.map((link, index) => (
															<NavLink to={link.link} key={index} className={link.className}>
																{link.title}
															</NavLink>
														))}
													</div>
												</div>
											</div>
										</div>
									</CarouselItem>
								))
							}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</SectionPage>

			{/* about */}
			<SectionPage
				id="about"
				sectionTitle={"About Us"}
				sectionClassName="bg-primary/35"
			>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
					<div className="overflow-hidden">
						<img 
							src="https://images.unsplash.com/photo-1570975640108-2292d83390ff?q=80&w=1922&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
							alt="uni"
							className="rounded-md object-cover object-center shadow-md"
						/>
					</div>
					<div>
						<h3 className="pb-3 border-b mb-4 text-lg font-bold">Welcome to Helix U.</h3>
						<p className="text-justify">We’re thrilled to welcome you to Helix University — a place where curiosity is encouraged, ideas come to life, and every student is empowered to grow, lead, and make a difference.

							At Helix U., we believe that education goes beyond books and classrooms. It’s about exploring your passions, challenging yourself, and discovering how you can contribute to the world around you. Whether you're here to study science, arts, business, or technology, you'll find a supportive community, inspiring faculty, and endless opportunities to learn and create.

							As you begin your journey with us, know that you’re not alone. You’re now part of a diverse and welcoming family that celebrates ambition, creativity, and collaboration. We’re excited to see the ideas you’ll bring and the path you’ll carve for yourself.

							Once again, welcome to Helix U. Your story starts here — and we can’t wait to be part of it.</p>
					</div>
				</div>

			</SectionPage>

			{/* vc message */}
			<SectionPage
				id="vc-message"
			>
				<div className="grid grid-cols-1 gap-10 items-center">
					<div className="overflow-hidden aspect-square max-w-[400px] mx-auto">
						<img
							src="https://images.unsplash.com/photo-1627161684458-a62da52b51c3?q=80&w=2049&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt="Chancellor"
							className="rounded-md object-cover w-full h-full shadow-md"
						/>
					</div>
					<p className="text-pretty text-center max-w-[900px] w-full mx-auto">Welcome to Helix University! As Vice-Chancellor, it is my pleasure to greet you as you begin or continue your journey with us. At Helix U., we are dedicated to fostering an inclusive, inspiring environment where students, faculty, and staff can thrive. Our focus on academic excellence, innovation, and global engagement prepares our community to lead and make a positive impact in the world. I encourage you to take full advantage of the opportunities available, both inside and outside the classroom. We are proud to have you with us and look forward to supporting your growth every step of the way.</p>
					<p className="text-center font-bold text-sm">- Dr. Reid Richards (Vice Chancellor)</p>
				</div>
			</SectionPage>

			
		</section>
	)
}

export default App