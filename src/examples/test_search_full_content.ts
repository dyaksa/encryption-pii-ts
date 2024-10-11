import CryptoTs from '../index';

async function exampleGetHeapsByFullContent() {
	try {
		const inputValue = "ali.farhan160@yopmail.com"
		const splitValue = CryptoTs.split(inputValue)
        const result = await CryptoTs.searchContentFullText('email_text_heap', { contents: splitValue});
        console.log('Result:', result);
    } catch (error) {
        console.error('Error fetching heaps by content:', error);
    }
}

exampleGetHeapsByFullContent();
