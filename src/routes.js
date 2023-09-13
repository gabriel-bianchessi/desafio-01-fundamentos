import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      return res.end()
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      if (req.headers['content-type'] === 'application/json') {
        const { title, description } = req.body

        if (!title || !description) {
          return res
            .writeHead(400)
            .end(JSON.parse({ message: 'Title and description are mandatory' }))
        }

        const task = {
          id: randomUUID(),
          title,
          description,
          completed_at: null,
          created_at: Date.now(),
          updated_at: Date.now(),
        }

        database.insert('tasks', task)

        return res.writeHead(201).end()
      } else if (res.header['content-type'] === 'multipart/form-data') {
        return res.end()
      }

      return res.writeHead(400).end()
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      return res.end()
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      return res.end()
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      return res.end()
    },
  },
]
