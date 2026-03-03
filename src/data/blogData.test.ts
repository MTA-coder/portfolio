import { describe, it, expect } from 'vitest'
import { blogPosts } from './blogData'

describe('blogData', () => {
    it('exports at least one blog post', () => {
        expect(blogPosts.length).toBeGreaterThan(0)
    })

    it('each post has all required fields', () => {
        for (const post of blogPosts) {
            expect(post.slug).toBeTruthy()
            expect(post.title).toBeTruthy()
            expect(post.excerpt).toBeTruthy()
            expect(post.image).toBeTruthy()
            expect(post.date).toBeTruthy()
            expect(post.readTime).toBeTruthy()
            expect(post.category).toBeTruthy()
            expect(post.content).toBeTruthy()
            expect(post.author).toBeDefined()
            expect(post.author.name).toBeTruthy()
        }
    })

    it('slugs are URL-friendly', () => {
        for (const post of blogPosts) {
            expect(post.slug).toMatch(/^[a-z0-9-]+$/)
        }
    })

    it('external URLs are valid https when present', () => {
        for (const post of blogPosts) {
            if (post.externalUrl) {
                expect(post.externalUrl).toMatch(/^https:\/\//)
            }
        }
    })
})
