const galleryData = [
    { id: 1, title: "Campus Aerial View", description: "A bird’s eye view of the Helix U. campus.", imageUrl: "https://images.unsplash.com/photo-1704005568204-cd0d56b1c32c?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "Main Lecture Hall", description: "Where ideas come alive in large discussions.", imageUrl: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, title: "Library Interior", description: "Thousands of books and digital resources.", imageUrl: "https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, title: "Student Lounge", description: "A relaxing space for students to unwind.", imageUrl: "https://plus.unsplash.com/premium_photo-1683887034552-4635692bb57c?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 5, title: "Science Lab", description: "Hands-on learning and cutting-edge research.", imageUrl: "https://images.unsplash.com/photo-1602052577122-f73b9710adba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 6, title: "Innovation Center", description: "Where creativity and technology meet.", imageUrl: "https://plus.unsplash.com/premium_photo-1683887033250-25abb485d315?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 7, title: "University Gardens", description: "Peaceful greenery in the heart of campus.", imageUrl: "https://images.unsplash.com/photo-1702151551480-accfac0b8315?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 8, title: "Sports Arena", description: "Home to major athletic and cultural events.", imageUrl: "https://images.unsplash.com/photo-1638569794984-d47b2983c1c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 9, title: "Cafeteria", description: "Meals and snacks from around the world.", imageUrl: "https://plus.unsplash.com/premium_photo-1679498534827-cbb791fea11c?q=80&w=1956&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 10, title: "Art Studio", description: "Creative workspaces for budding artists.", imageUrl: "https://images.unsplash.com/photo-1705459965553-6df64f9785db?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 11, title: "Student Housing", description: "Comfortable and secure campus residences.", imageUrl: "https://plus.unsplash.com/premium_photo-1716767947578-43b513a03333?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 12, title: "Computer Lab", description: "Equipped with the latest tech tools.", imageUrl: "https://images.unsplash.com/photo-1713464050974-9245669e7c05?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 13, title: "Faculty Office", description: "Where students connect with professors.", imageUrl: "https://images.unsplash.com/photo-1663162550973-d0a7ce89b46c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 14, title: "Open Courtyard", description: "A place for group study and gatherings.", imageUrl: "https://images.unsplash.com/photo-1708451465471-21b4e225f801?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 15, title: "Career Center", description: "Guiding students toward their futures.", imageUrl: "https://plus.unsplash.com/premium_photo-1661503423349-63ad7057bc22?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 16, title: "Cultural Fest", description: "Celebrating diversity and student talent.", imageUrl: "https://images.unsplash.com/photo-1715270163792-860b868fe8f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 17, title: "Graduation Day", description: "A proud moment for every Helix graduate.", imageUrl: "https://images.unsplash.com/photo-1533854775446-95c4609da544?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 18, title: "Research Symposium", description: "Students showcase innovative projects.", imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2098&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 19, title: "Alumni Meet", description: "Reconnecting with graduates across decades.", imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 20, title: "Night View", description: "The campus lit up under the stars.", imageUrl: "https://images.unsplash.com/photo-1606388062959-71c8182b4b45?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
]

const usefulLinks = [
    {
        id: 1,
        label: "Faculty and departments",
        url: "/academics/faculty-and-department"
    },
    {
        id: 1,
        label: "Courses",
        url: "/academics/courses"
    },
    {
        id: 1,
        label: "Faculty members",
        url: "/academics/teachers"
    },
]

export {
    galleryData,
    usefulLinks
}
