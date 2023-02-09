//Navbar Option
export const navBarOption = (optionNum) => cy.get('.screen-content > .hidden > a:nth-child('+optionNum+')');

//Navbar Connect Button
export const navBarConnectBtn = () => cy.get('.relative> .text-white');

//Footer 
export const footerOption = (optionNum) => cy.get('.main-container > :nth-child(5) > .items-center > .flex > a:nth-child('+optionNum+')');

//Connect Modal
export const metamaskOption = () => cy.get('.mt-8 > :nth-child(1)');

//NFT Collections
export const nftCollectionText = (optionNum) => cy.get(':nth-child('+optionNum+') > .nft-card > .p-6 > .bg-be-white > .justify-between > :nth-child(1) > .mt-2');
export const nftDemoBtn = (optionNum) => cy.get(':nth-child('+optionNum+') > .nft-card > .p-6 > .bg-be-white > .h-12');

//Page Heading
export const currentPageHeader = () => cy.get('.font-header');
export const navChainElements = (optionNum) => cy.get('.mt-4>:nth-child('+optionNum+')');

//Customize NFT Derivative
export const customizeCategoryText = (optionNum) =>  cy.get(':nth-child('+optionNum+') > .h-7');
export const selectCustomCloth = (optionNum) =>  cy.get('#carouselclothes >:nth-child('+optionNum+')');
export const selectCustomAccessory = (optionNum) =>  cy.get('#carouselheadgear >:nth-child('+optionNum+')');
export const selectCustomBackground = (optionNum) =>  cy.get('#carouselbackground >:nth-child('+optionNum+')');
export const verifyCustomSelection = (optionNum) => cy.get('.horizan-scroll > :nth-child('+optionNum+') > .flex');

//Royaly Text Section
export const royaltyTextHeading = () => cy.get('.space-x-2 > span');
export const royaltyInfoBtn = () => cy.get('.space-x-2 > img');
export const royaltyInfoModal = () => cy.get('div\[slot=content\]');
export const royaltyInfoModalCloseBtn = () => cy.get('.h-8 > svg');

//Cancel and Preview Buttons
export const cancelBtn = () =>  cy.get('.order-last > .be-button');
export const previewBtn = () => cy.get('.flex-col > .be-button');

//Preview Pane
export const expandPreview = () => cy.get('.absolute > .bg-be-grey2');
export const customizedSelectionHeaders = (optionNum) => cy.get(':nth-child('+optionNum+') > .mb-2');
export const selectedCustomizations = (optionNum) => cy.get(':nth-child('+optionNum+') > .text-be-black');
export const editButton = () =>  cy.get(':nth-child(1) > .flex > .ml-1');
export const removeButton = () =>  cy.get(':nth-child(2) > .flex > .ml-1');
export const mintDerivativeBtn = () => cy.get('.screen-content > .flex > .w-full > .be-button');
export const customizeAnother = () => cy.get('.order-last > .be-button');

//Mint Page
export const mintInProgress = () => cy.get('.text-18px')
export const mintedDerivativeHeader = () => cy.get('.font-header');
export const mintedDerivativeCopyBtn = () => cy.get('.rounded-md > svg');
export const mintedDerivativePropertiesHeader = (optionNum) => cy.get('.text-lg:nth-child('+optionNum+')>.mb-2:nth-child(1)');
export const mintedDerivativeCustomizedProperties = (optionNum) => cy.get('.text-lg:nth-child('+optionNum+') > .text-be-black');
export const getDerivativeNFTNum = () => cy.get('.derivatives-popup-content > .flex > a');

//Browse
export const selectBrowsingCollection = (optionNum) => cy.get(':nth-child('+optionNum+') > .nft-card > .p-6 > .mt-6 > :nth-child(2)')