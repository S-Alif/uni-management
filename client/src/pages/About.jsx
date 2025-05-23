import SectionPage from "@/components/SectionPage";
import PublicPageLayout from "./public/components/layouts/PublicPageLayout";

const About = () => {
    return (
        <PublicPageLayout
            pageId="about"
            pageImg="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=2048&q=80"
            pageTitle="About Helix U."
        >
            <SectionPage id="about-us" sectionTitle="Welcome to Helix University">
                <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
                    Established in 1890, Helix University is a world-class center for learning and innovation. Located in a vibrant academic hub, our institution fosters an inclusive, forward-thinking community of scholars dedicated to advancing global progress through education and research.
                </p>

                {/* Mission & Vision */}
                <div className="mt-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
                        <div className="overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Mission"
                                className="rounded-xl shadow"
                            />
                        </div>
                        <div className="flex flex-col lg:justify-center">
                            <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200 pb-3 mb-4 border-b">Our Mission</h3>
                            <p className="text-gray-700 dark:text-gray-300 mt-2 text-justify">
                                At Helix University, our mission is the cornerstone of everything we do. We believe education is more than the transfer of knowledge — it’s about awakening curiosity, fostering critical thinking, and equipping individuals with the skills they need to become responsible global citizens. Our curriculum is built on the foundation of real-world relevance and academic rigor, ensuring that our students not only learn but also apply their learning in meaningful ways.

                                We aim to inspire through a vibrant learning environment where students are challenged to reach beyond their perceived limits. With a strong emphasis on interdisciplinary collaboration, hands-on learning, and service-based initiatives, we empower learners to connect ideas across fields and solve real-world problems.

                                Ultimately, our mission is a promise — a promise to remain a beacon of intellectual growth, personal development, and societal advancement. Through transformative education and purpose-driven research, Helix University stands committed to nurturing individuals who will lead, serve, and innovate with integrity in an ever-evolving world.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full mt-10">
                        <div className="overflow-hidden lg:order-2">
                            <img
                                src="https://images.unsplash.com/photo-1522211988038-6fcbb8c12c7e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Vision"
                                className="rounded-xl shadow"
                            />
                        </div>
                        <div className="flex flex-col lg:justify-center">
                            <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200 pb-3 mb-4 border-b">Our Vision</h3>
                            <p className="text-gray-700 dark:text-gray-300 mt-2 text-justify">
                                At the heart of Helix University’s long-term vision lies a bold aspiration — to illuminate the path forward in education, innovation, and societal leadership. We see ourselves not merely as an institution of learning, but as a catalyst for progress in an increasingly complex, interconnected world.

                                Being a beacon of knowledge means fostering an intellectual environment that welcomes curiosity, encourages creativity, and champions diverse perspectives. We envision a campus where ideas cross boundaries, cultures blend harmoniously, and students from all walks of life feel empowered to think beyond limitations. From pioneering sustainability models to advancing digital transformation in learning, our goal is to set benchmarks that redefine excellence.  

                                Our vision isn’t confined by borders. We aim to leave a global footprint by expanding access to high-quality education and building knowledge networks that span continents. Through this vision, Helix University commits to enriching human potential and contributing to a more inclusive, enlightened, and innovative global society.
                            </p>
                        </div>
                    </div>
                </div>

                {/* History Section */}
                <div className="mt-16">
                    <h3 className="section-title">Our Legacy</h3>
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <img
                            src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=900&q=80"
                            alt="Historic Campus"
                            className="rounded-xl shadow"
                        />
                        <p className="text-gray-700 dark:text-gray-300 text-justify">
                            The journey of Helix University is a testament to the power of vision, resilience, and a commitment to growth. What started in 1890 as a modest campus with just one lecture hall and a few pioneering educators has since blossomed into one of the most respected academic institutions in the world.

                            Throughout the 20th century, the university expanded its infrastructure, faculty, and academic offerings. From building state-of-the-art laboratories in the 1960s to establishing the College of Global Affairs in the early 2000s, each decade brought a new wave of innovation. We adapted to the evolving needs of society — whether it was by integrating computer science into the core curriculum or by launching interdisciplinary research centers that tackled societal challenges such as public health crises, environmental degradation, and social inequality.

                            Today, Helix University is home to more than 25,000 students from over 80 nations, supported by a distinguished faculty of 1,500 educators and researchers. Our alumni network — now active in 70+ countries — leads industries, influences policy, and advances research across the globe. We remain firmly rooted in our founding values, yet we continuously evolve to meet the demands of the future.
                        </p>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mt-16">
                    <h3 className="section-title">Our Core Values</h3>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>Academic Integrity</li>
                        <li>Innovation and Excellence</li>
                        <li>Diversity and Inclusion</li>
                        <li>Community Engagement</li>
                        <li>Global Citizenship</li>
                    </ul>
                </div>

                {/* Campus Life */}
                <div className="mt-16">
                    <h3 className="section-title">Life at Helix U.</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1664372145865-c7526455ea94?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Campus"
                            className="rounded-xl shadow"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Library"
                            className="rounded-xl shadow"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1580537782437-8d6a0ca13de6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Students"
                            className="rounded-xl shadow"
                        />
                    </div>
                </div>

                {/* Leadership */}
                <div className="mt-16">
                    <h3 className="section-title">University Leadership</h3>
                    <div className="flex items-center gap-6">
                        <img
                            src="https://images.unsplash.com/photo-1627161684458-a62da52b51c3?q=80&w=2049&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Chancellor"
                            className="w-24 h-24 rounded-full object-cover shadow"
                        />
                        <div>
                            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">Dr. Reid Richards</p>
                            <p className="text-gray-600 dark:text-gray-400">Chancellor, Helix University</p>
                        </div>
                    </div>
                </div>

            
            </SectionPage>
        </PublicPageLayout>
    );
};

export default About;
