import { FastifyReply, FastifyRequest } from 'fastify'
import dayjs from 'dayjs'
import { z } from 'zod'

export class Controller {

    static async index(request: FastifyRequest, reply: FastifyReply) {

        const today = dayjs().format('YYYY-MM-DD')
        const time = dayjs(today).diff('2022-03-01', 'years')

        const profile = {
            name: 'Rafael Tiburcio',
            age: dayjs(today).diff('1986-11-15', 'years'),
            birthdate: dayjs('1986-11-15').format('DD/MM/YYYY'),
            linkedin: 'https://linkedin.com/in/rafael-sp',
            facebook: '',
            instagram: '',
            experience: 'Pleno',
            role: 'Software Developer',
            city: 'Sorocaba/SP',
            phone: '15-99720-0879',
            email: 'rafael.tiburcio@live.com',
            description: {
                title: `👨‍💻 Experienced Software Developer 🚀`,
                introduction: `Passionate about crafting elegant solutions and driving innovation through technology.`,
                backend: `🔵 Backend Expertise: With over ${time} years of experience in backend development, I've honed my skills in designing and building robust, scalable, and efficient server-side systems. My proficiency spans multiple languages, including JavaScript, Node.js, PHP, and Python. This ensures the delivery of high-performance, secure, and maintainable solutions across a wide array of technologies.`,
                frontend: `🟢 Frontend Wizardry: Adept at creating captivating user experiences, I possess an in-depth understanding of modern frontend technologies. From responsive web design to interactive interfaces, I have successfully brought user interfaces to life while ensuring seamless cross-browser compatibility.`,
                mobile: `📱 Mobile Maestro: My journey in software development includes a rich history of mobile app development, encompassing both iOS and Android platforms. I've created feature-rich, user-friendly mobile applications that have received acclaim for their functionality and design.`,
                iot: `🌐 Cutting-Edge Technologies: I thrive on staying at the forefront of technological advancements. My expertise extends to a wide range of emerging technologies, such as IoT (Internet of Things), machine learning, and cloud computing. I believe in leveraging these technologies to solve real-world problems and drive business growth.`,
            }
        }

        const skills = {
            dart: 50,
            c: 50,
            javascript: 90,
            php: 80,
            python: 70,
            rust: 30
        }

        const frameworks = {
            react: 70,
            nextjs: 60,
            vue: 50,
            fastify: 90,
            laravel: 80,
            nest: 70,
            flask: 70,
            django: 50,
        }

        return reply.view('index.hbs', { profile, skills, frameworks })
    }

    static async contact(request: FastifyRequest, reply: FastifyReply) {
        const parts = request.parts()
        let data
        for await (const part of parts) {
            if (part.type === 'file') {

            } else {
                data = part.fields
            }
        }
        
        const schema = z.object({
            name: z.object({ value: z.string().min(1).max(50) }),
            email: z.object({ value: z.string().min(1).max(50).email() }),
            subject: z.object({ value: z.string().min(1).max(50) }),
            message: z.object({ value: z.string().min(1).max(50) })
        })

        const isValid = await schema.safeParseAsync(data)

        if (!isValid.success) {
            return reply.status(400).send({
                message: isValid.error.formErrors.fieldErrors
            })
        }

        const { email, message, name, subject } = isValid.data

        const objectContact = {
            name: name.value,
            email: email.value,
            message: message.value,
            subject: subject.value
        }

        reply.status(201).send({
            data: objectContact
        })
        
     }
}