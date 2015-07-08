//
// Report Service
//
// This service provides a dummy document definition for the purpose of this sample.  In 
// my real world usage, I split documentDef creation from the reportPDF creation.  The RptBuilderSvc
// is used to receive inputs and return a JSON object w/ the report declarations.  This mock svc
// just creates some random progress matrix and draws a table to display.  The pdfMake.org site
// has a nice playground for drafting your report pieces.  My plan is to share the ionic-pdf
// so users can incorporate PDF generation and focus on creating their docDefs and using ionic-pdf
// to easily render
(function() {
  'use strict';
  // attach the factories and service to the [starter.services] module in angular
  angular.module('starter.services')
  .service('ReportBuilderSvc', reportBuilderService);
  
  function reportBuilderService() {
    var self = this;
    
    self.generateReport = _generateReport;            
    function _generateReport() {
      return {
	content: [
		{ text: '{{R_title}}', style: 'header' },
		{
			ol: [
				'item 1',
				'item 2',
				'item 3',
			]
		},
		{ text: '\n\nUnordered list with longer lines', style: 'header' },
		{
			ol: [
				'item 1',
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
				'item 3',
			]
		},
		{ text: '\n\nNested lists', style: 'header' },
		{
			ol: [
				'item 1',
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
				{
					ol: [
					'subitem 1',
					'subitem 2',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					{ text: [
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						] },
	
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 4',
					'subitem 5',
					]
				},
				'item 3\nsecond line of item3',
			]
		},
		{ text: '\n\nLists inside columns', style: 'header' },
		{
			columns: [
				{
					ul: [
						'item 1',
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					]
				},
				{
					ul: [
						'item 1',
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					]
				}
			]
		},
		{ text: 'Unordered list', style: 'header' },
		{
			ul: [
				'item 1',
				'item 2',
				'item 3',
			]
		},
		{ text: '\n\nUnordered list with longer lines', style: 'header' },
		{
			ul: [
				'item 1',
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
				'item 3',
			]
		},
		{ text: '\n\nNested lists', style: 'header' },
		{
			ol: [
				'item 1',
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
				{
					ul: [
					'subitem 1',
					'subitem 2',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					{ text: [
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						] },
	
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 4',
					'subitem 5',
					]
				},
				'item 3\nsecond line of item3',
			]
		},
		{ text: '\n\nLists inside columns', style: 'header' },
		{
			columns: [
				{
					ul: [
						'item 1',
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					]
				},
				{
					ul: [
						'item 1',
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					]
				}
			]
		},{ text: 'Unordered list', style: 'header' },
		{
			ul: [
				'item 1',
				'item 2',
				'item 3',
			]
		},
		{ text: '\n\nUnordered list with longer lines', style: 'header' },
		{
			ul: [
				'item 1',
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
				'item 3',
			]
		},
		{ text: '\n\nNested lists', style: 'header' },
		{
			ul: [
				'item 1',
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
				{
					ol: [
					[
						{
							columns: [
								'column 1',
								{
									stack: [
										'column 2',
										{
											ul: [
												'item 1',
												'item 2',
												{
													ul: [
														'item',
														'item',
														'item',
													]
												},
												'item 4',
											]
										}
									]
								},
								'column 3',
								'column 4',
							]
						},
						'subitem 1 in a vertical container',
						'subitem 2 in a vertical container',
					],
					'subitem 2',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					{ text: [
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						] },
	
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 4',
					'subitem 5',
					]
				},
				'item 3\nsecond line of item3',
			]
		},
		{ text: '\n\nLists inside columns', style: 'header' },
		{
			columns: [
				{
					ul: [
						'item 1',
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					]
				},
				{
					ul: [
						'item 1',
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					]
				}
			]
		},{ text: 'Unordered list', style: 'header' },
		{
			ul: [
				'item 1',
				'item 2',
				'item 3',
			]
		},
		{ text: '\n\nUnordered list with longer lines', style: 'header' },
		{
			ul: [
				'item 1',
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
				'item 3',
			]
		},
		{ text: '\n\nNested lists', style: 'header' },
		{
			ul: [
				'item 1',
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
				{
					ul: [
					'subitem 1',
					'subitem 2',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					{ text: [
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
						] },
	
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					'subitem 4',
					'subitem 5',
					]
				},
				'item 3\nsecond line of item3',
			]
		},
		{ text: '\n\nLists inside columns', style: 'header' },
		{
			columns: [
				{
					ul: [
						'item 1',
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					]
				},
				{
					ul: [
						'item 1',
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
					]
				}
			]
		},{ text: 'Unordered list', style: 'header' },
		{
			ul: [
				'item 1',
				'item 2',
				'item 3',
			]
		},
		{ text: '\n\nUnordered list with longer lines', style: 'header' },
		{
			ul: [
				'item 1',
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
				'item 3',
			]
		},
	],
	styles: {
		header: {
			bold: true,
			fontSize: 15
		}
	},
	defaultStyle: {
		fontSize: 12,
	}
	
};
    };
  }
})();