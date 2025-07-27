import { describe, test, expect, it } from "vitest";

import { getAllCards } from '../routes/cards/cardFunctions.mjs'

describe('Get All Cards Function', () => {
    test('Should return all cards with length of 45', async () => {
        // Mock request object
        const mockReq = {};
        
        // Mock response object
        let responseData;
        let statusCode;
        
        const mockRes = {
            status: (code) => {
                statusCode = code;
                return mockRes;
            },
            json: (data) => {
                responseData = data;
                return mockRes;
            }
        };

        // Call the function
        await getAllCards(mockReq, mockRes);

        // Assertions
        expect(statusCode).toBe(200);
        expect(Array.isArray(responseData)).toBe(true);
        expect(responseData).toHaveLength(45);
    });
});