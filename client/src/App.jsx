import { NavLink } from "react-router";
import SectionPage from "./components/SectionPage";
import { buttonVariants } from "./components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

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
				{
					title: "Research Opportunities",
					link: "/research",
					className: buttonVariants({ size: "lg", variant: "default" })
				},
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

			
		</section>
	)
}

export default App