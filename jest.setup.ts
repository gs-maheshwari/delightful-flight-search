import "@testing-library/jest-dom";
import 'next-router-mock';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))
