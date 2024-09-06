import CryptoTs from '../index';

async function exampleGetHeapsByFullContent() {
	try {
        const result = await CryptoTs.searchContentFullText('name_text_heap', { contents: ['maya', 'sri', 'hilman']});
        console.log('Result:', result);
    } catch (error) {
        console.error('Error fetching heaps by content:', error);
    }
}

exampleGetHeapsByFullContent();
