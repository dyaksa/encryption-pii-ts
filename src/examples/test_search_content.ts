import CryptoTs from '../index';

async function exampleGetHeapsByContent() {
	try {
        const inputValue = "Ali";
        const result = await CryptoTs.searchContents('name_text_heap', {content: inputValue});
        console.log('Result:', result);
    } catch (error) {
        console.error('Error fetching heaps by content:', error);
    }
}

exampleGetHeapsByContent();
