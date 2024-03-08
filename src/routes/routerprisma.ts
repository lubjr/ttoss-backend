import express from 'express'
import { prisma } from '../lib/prisma'
import { z } from 'zod' // Field validation

const prismaRouter = express.Router()

// Select all users
prismaRouter.get('/users', async (req, res) => {
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)

  return res.json(allUsers)
})

// Select user by id
prismaRouter.get('/users/:id', async (req, res) => {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(req.params)

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  })

  return res.json(user)
})

// Create user
prismaRouter.post('/users', async (req, res) => {
  const bodySchema = z.object({
    email: z.string(),
    name: z.string(),
    password: z.string(),
  })

  const { email, name, password } = bodySchema.parse(req.body)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password,
    },
  })

  return res.json(user)
})

// Update user
prismaRouter.put('/users/:id', async (req, res) => {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(req.params)

  const bodySchema = z.object({
    email: z.string(),
    name: z.string(),
    password: z.string(),
  })

  const { email, name, password } = bodySchema.parse(req.body)

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      email,
      name,
      password,
    },
  })
  return res.json(user)
})

// Delete user
prismaRouter.delete('/users/:id', async (req, res) => {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(req.params)

  const user = await prisma.user.delete({
    where: {
      id,
    },
  })

  return res.json(user)
})

export default prismaRouter
