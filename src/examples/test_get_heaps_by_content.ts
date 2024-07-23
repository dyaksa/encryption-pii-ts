import CryptoTs from '../index';

async function exampleGetHeapsByContent() {
    try {
        const inputValue = "Ali Farhan";
        const result = await CryptoTs.searchContents(inputValue);
        console.log('Result:', result);
    } catch (error) {
        console.error('Error fetching heaps by content:', error);
    }
}

exampleGetHeapsByContent();
