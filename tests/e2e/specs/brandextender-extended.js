import * as brandExtenderObjects from '../support/page-objects/brandextender.po';
import { BAYC_CLUB, MAYC_CLUB } from '../support/fixtures/brandextender-nftcollections.js';

const textData = require('../support/fixtures/brandextender-testdata.json');

describe("Brand Extender Assesment", () => {
    let mintedNFTNo;
    it("Visit demo page, verify page elements and connect wallet", function () {
        cy.log("Visit demo page and verify nav-bar, footer options");
        cy.visit("/");
        brandExtenderObjects.navBarOption(1).should('be.visible').should('have.text', textData.navbarBrowse);
        brandExtenderObjects.navBarOption(2).should('be.visible').should('have.text', textData.navbarBrandExtender);
        brandExtenderObjects.navBarOption(3).should('be.visible').should('have.text', textData.navbarTokenScript);
        brandExtenderObjects.footerOption(1).should('be.visible').should('have.text', textData.navbarBrandExtender);
        brandExtenderObjects.footerOption(2).should('be.visible').should('have.text', textData.navbarTokenScript);
        cy.log("Set Up metamask wallet and connect wallet");
        cy.setupMetamask();
        brandExtenderObjects.navBarConnectBtn().click();
        brandExtenderObjects.metamaskOption().should('contain', textData.metamask).click();
        cy.acceptMetamaskAccess();
        cy.log("Verify NFT Collections Text")
        cy.url().should('contain', '/tailor');
        cy.log("Verify NFT Collections are visible")
        brandExtenderObjects.nftCollectionText(1).should('contain', BAYC_CLUB.nftCollectiontext);
        brandExtenderObjects.nftCollectionText(2).should('contain', MAYC_CLUB.nftCollectiontext);
    });

    it("Select and NFT to customize and verify custom selections", function () {
        cy.log("Select BAYC NFT to customize and verify page header and nav options");
        brandExtenderObjects.nftDemoBtn(BAYC_CLUB.selectDemoOptionNum).should('be.visible').click();
        cy.url().should('contain', BAYC_CLUB.urlText);
        brandExtenderObjects.currentPageHeader().should('be.visible').should('have.text', textData.suitupHeader);
        brandExtenderObjects.navChainElements(1).should('be.visible').should('have.text', textData.pageNavSuitUp);
        brandExtenderObjects.navChainElements(3).should('be.visible').should('have.text', textData.pageNavPreview);
        brandExtenderObjects.navChainElements(5).should('be.visible').should('have.text', textData.pageNavMint);
        cy.log("Customize Clothing, Accessories and Background for NFT and verify selections");
        //Clothing
        brandExtenderObjects.customizeCategoryText(1).should('have.text', textData.customizeClothingHeader);
        brandExtenderObjects.selectCustomCloth(49).click();
        brandExtenderObjects.verifyCustomSelection(1).should('contain', 'Hoodie');
        //Accessories
        brandExtenderObjects.customizeCategoryText(3).should('have.text', textData.customizeHeadgearHeader);
        brandExtenderObjects.selectCustomAccessory(24).click();
        brandExtenderObjects.verifyCustomSelection(3).should('contain', 'Zeus Sunglasses');
        //Background
        brandExtenderObjects.customizeCategoryText(5).should('have.text', textData.customizeBackgroundHeader);
        brandExtenderObjects.selectCustomBackground(6).click();
        brandExtenderObjects.verifyCustomSelection(5).should('contain', 'Purple Cactus');
        cy.log("Verify Royalties Text, open close royalty modal, and verify cancel and preview buttons");
        brandExtenderObjects.royaltyTextHeading().should('contain', textData.royalitiesNote);
        brandExtenderObjects.royaltyInfoBtn().click();
        brandExtenderObjects.royaltyInfoModal().should('be.visible');
        brandExtenderObjects.royaltyInfoModalCloseBtn().click();
        brandExtenderObjects.cancelBtn().should('be.visible').should('contain', textData.cancelButton);
        brandExtenderObjects.previewBtn().should('be.visible').should('contain', textData.previewButton);
    });

    it("Navigate to preview page and verify customizations", function () {
        brandExtenderObjects.previewBtn().should('be.visible').should('contain', textData.previewButton).click();
        cy.url('contains', '/preview');
        brandExtenderObjects.currentPageHeader().should('be.visible').should('have.text', textData.pageNavPreview);
        brandExtenderObjects.expandPreview().click();
        cy.log("Expand preview pane to verify selections");
        brandExtenderObjects.customizedSelectionHeaders(1).should('have.text', textData.originText);
        brandExtenderObjects.selectedCustomizations(1).should('have.text', 'BAYC #1013');
        brandExtenderObjects.customizedSelectionHeaders(2).should('have.text', textData.customizeClothingHeader);
        brandExtenderObjects.selectedCustomizations(2).should('have.text', 'Hoodie');
        brandExtenderObjects.customizedSelectionHeaders(3).should('have.text', textData.accessoriesText);
        brandExtenderObjects.selectedCustomizations(3).should('have.text', 'Zeus Sunglasses');
        brandExtenderObjects.customizedSelectionHeaders(4).should('have.text', textData.backgroundText);
        brandExtenderObjects.selectedCustomizations(4).should('have.text', 'Purple Cactus');
        cy.log("Verify available buttons");
        brandExtenderObjects.editButton().should('have.text', textData.editButton);
        brandExtenderObjects.removeButton().should('have.text', textData.removeButton);
        brandExtenderObjects.customizeAnother().should('contain', textData.customizeAnother);
        brandExtenderObjects.mintDerivativeBtn().should('contain', `${textData.mintText} 1 ${textData.derivativeText}`);
    });

    it("Mint NFT and verify the minted nft details", function () {
        cy.log("Mint NFT and confirm transaction");
        brandExtenderObjects.mintDerivativeBtn().should('contain', `${textData.mintText} 1 ${textData.derivativeText}`).click();
        cy.wait(5000);
        cy.confirmMetamaskTransaction().then(confirmed => {
            expect(confirmed).to.be.true;
        });
        cy.log("Wait for NFT to be minted and verify NFT properties");
        brandExtenderObjects.mintedDerivativeCopyBtn().should("be.visible");
        brandExtenderObjects.mintedDerivativePropertiesHeader(1).should('have.text', textData.customizeClothingHeader);
        brandExtenderObjects.mintedDerivativeCustomizedProperties(1).should('have.text', 'Hoodie');
        brandExtenderObjects.mintedDerivativePropertiesHeader(2).should('have.text', textData.headgearText);
        brandExtenderObjects.mintedDerivativeCustomizedProperties(2).should('have.text', 'Zeus Sunglasses');
        brandExtenderObjects.mintedDerivativePropertiesHeader(3).should('have.text', textData.backgroundText);
        brandExtenderObjects.mintedDerivativeCustomizedProperties(3).should('have.text', 'Purple Cactus');
        brandExtenderObjects.mintedDerivativePropertiesHeader(4).should('have.text', textData.originText);
        brandExtenderObjects.mintedDerivativeCustomizedProperties(4).should('have.text', 'BAYC #1013');
        cy.log("Trigged mouseover event to get the derived NFT number")
        brandExtenderObjects.mintedDerivativeCopyBtn().trigger("mouseover").
            then(() => {
                brandExtenderObjects.getDerivativeNFTNum().should('be.visible').then(($popupOnHover) => {
                    mintedNFTNo = $popupOnHover.text();
                    cy.log(mintedNFTNo);
                })
            })
    })

    it("Visit browse NFT page and verify the derivative NFT", function () {
        cy.visit('/')
        cy.log("Visit derivative NFT collections for BAYC")
        brandExtenderObjects.navBarOption(1).click();
        cy.url('contain', '/browse');
        brandExtenderObjects.selectBrowsingCollection(3).click();
        cy.url('contain', `${BAYC_CLUB.urlText}\all`)
        brandExtenderObjects.currentPageHeader().should('contain', `${BAYC_CLUB.nftOriginText} Derivatives`);
        cy.contains("BAYC #1013-22");
    })
})