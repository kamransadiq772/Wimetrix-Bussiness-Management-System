export const styles = {
    // Upper heading Buttons
    upper : { width: '100%', height: '50px', display: 'flex', justifyContent: 'space-between' },
    upperHeading : { fontSize: '23px', fontWeight: 'bold', color: 'gray' },
    newBtnContainer : { float: 'right' },
    newBtn : { cursor: 'pointer', height: '60%', display: 'flex', alignItems: 'center', padding: '12px', borderRadius: '50px', border: '0px', backgroundColor: '#785EE0', color: 'white', fontWeight: 'bold', fontSize: "12px" },
    newBtnSpan : { marginRight: '10px' },
    newBtnIcon : { fontSize: '20px' },

    // Table Section
    tableContainer : { backgroundColor: "white", padding: '10px', border: '2px solid rgba(187, 187, 187, 0.5)', borderRadius: '10px' },
    tablePaper : { width: '100%', overflow: 'hidden', borderRadius: '10px' },
    tablePaperInnerTableContainer : { maxHeight: 440, overflowY: 'scroll', '&::-webkit-scrollbar': { width: 0, } },
    tableHeaderCell : { backgroundColor: '#785EE0', color: 'white' },

    //Modal Section

    modalInner : { width: '90%', height: '70vh', borderRadius: '7px', backgroundColor: 'rgba(245,245,245,1)', zIndex: '1300', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
    modalHeader : { padding: '0px 20px', display: 'flex', justifyContent: 'space-between', height: '60px', backgroundColor: '#785EE0', borderRadius: '5px 5px 0px 0px' },
    modalHeadingContainer : { display: 'flex', alignItems: 'center', paddingTop: '5px' },
    modalHeadingPara : { color: 'white', fontWeight: '700', fontSize: '25px', padding: '0px', margin: '0px' },
    modalCrossContainer : { display: 'flex', alignItems: 'center', paddingTop: '10px' },
    modalCrossIcon : { color: 'white', cursor: 'pointer', fontSize: '25px' },
    
    modalForm : { textAlign: 'center', flex: 1, padding: '10px' },
    modalFormInput : { marginRight: '10px', marginBottom: '10px',width:'200px' },

    modalButtonContainer : { height: '60px', bottom: '0', backgroundColor: '', borderRadius: '0px 0px 5px 5px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    modalCreateButton : { height: '55%', cursor: 'pointer', margin: '0px 3px', width: '180px', borderRadius: '10px', border: 'none', fontWeight: '800', fontSize: '14px', color: 'white', backgroundColor: '#785EE0' },
    modalClearButton : { height: '55%', cursor: 'pointer', margin: '0px 3px', width: '180px', borderRadius: '10px', border: 'none', fontWeight: '800', fontSize: '14px', color: 'rgba(100,100,100,0.8)', backgroundColor: 'rgba(200,200,200,0.7)' },
    modalUpdateButton : { display: 'none', height: '55%', cursor: 'pointer', margin: '0px 3px', width: '180px', borderRadius: '10px', border: 'none', fontWeight: '800', fontSize: '14px', color: 'white', backgroundColor: '#785EE0' },
    modalCancelButton : { display: 'none', height: '55%', cursor: 'pointer', margin: '0px 3px', width: '180px', borderRadius: '10px', border: 'none', fontWeight: '800', fontSize: '14px', color: 'rgba(100,100,100,0.8)', backgroundColor: 'rgba(200,200,200,0.7)' },


    //Loading

    

}