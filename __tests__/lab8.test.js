describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    // await page.waitForNavigation();
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  describe('Click on entry 1', () => {
    beforeAll(async () => {
      await page.click('main journal-entry:nth-child(1)');
    });

    it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
      // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
  
      var url = page.url();
      url = url.split('/').pop();
      expect(url).toBe('#entry1');
    }, 30000);

    it('Test4: On first Entry page - checking page header title', async () => {
      // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
      
      var header_text = await page.$eval("header > h1", el => el.textContent);
      expect(header_text).toBe('Entry 1');
  
    }, 30000);
  
  
    it('Test5: On first Entry page - checking <entry-page> contents', async () => {
  
        const entries = await page.$$('journal-entry');
        let data = await entries[0].getProperty('entry');
        let plainValue = await data.jsonValue();
  
        expect(plainValue.title).toBe('You like jazz?');
        expect(plainValue.date).toBe('4/25/2021');
        expect(plainValue.content).toBe(`According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.`);
        expect(plainValue.image.src).toBe('https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455');
        expect(plainValue.image.alt).toBe('bee with sunglasses');
      /*
       implement test5: Clicking on the first journal entry should contain the following contents: 
          { 
            title: 'You like jazz?',
            date: '4/25/2021',
            content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
            image: {
              src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
              alt: 'bee with sunglasses'
            }
          }
        */
  
    }, 10000);

    it('Test6: On first Entry page - checking <body> element classes', async () => {
      // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’

      var class_name = await page.evaluate(() => document.querySelector('body').className);
      expect(class_name).toBe('single-entry');

    }, 10000);

    describe('Click on Settings icon', () => {
      beforeAll(async() => {
        //click on settings
        await page.click('header > img');
        
      });

      it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
        // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
        var url = page.url();
        url = url.split('/').pop();
        expect(url).toBe('#settings');
      });

      it('Test8: On Settings page - checking page header title', async () => {
        // implement test8: Clicking on the settings icon should update the header to be “Settings”
        var header_text = await page.$eval("header > h1", el => el.textContent);
        expect(header_text).toBe('Settings');
      });

      it('Test9: On Settings page - checking <body> element classes', async () => {
        // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
        var class_name = await page.evaluate(() => document.querySelector('body').className);
        expect(class_name).toBe('settings');
      });

      describe('Click on back button', () => {
        beforeAll(async() => {
          //click on settings
          await page.goBack();
          
        });

        it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
          // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’

          var url = page.url();
          url = url.split('/').pop();
          expect(url).toBe('#entry1');
        });

        it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
          // implement test11: Clicking the back button once should bring the user back to the home page
          await page.goBack();
          var url = page.url();
          url = url.split('/').pop();
          expect(url).toBe('');
        });
      });
    });
  });

  it('Test12: When the user is on the homepage, the header title should be “Journal Entries”', async() => {
    // implement test12: When the user is on the homepage, the header title should be “Journal Entries”
    var header_text = await page.$eval("header > h1", el => el.textContent);
    expect(header_text).toBe('Journal Entries');
  });

  it('Test13: On the home page the <body> element should not have any class attribute ', async () => {
    // implement test13: On the home page the <body> element should not have any class attribute 
    var class_name = await page.evaluate(() => document.querySelector('body').className);
    expect(class_name).toBe('');
  });

  describe('Click on entry 2', () => {
    beforeAll(async () => {
      await page.click('main journal-entry:nth-child(2)');
    });

    it('Test14: Verify the url is correct when clicking on the second entry', async() => {
      // implement test14: Verify the url is correct when clicking on the second entry
      var url = page.url();
      url = url.split('/').pop();
      expect(url).toBe('#entry2');
    });

    it('Test15: Verify the title is correct when clicking on the second entry', async() => {
      //implement test15: Verify the header title is current when clicking on the second entry
      var header_text = await page.$eval("header > h1", el => el.textContent);
      expect(header_text).toBe('Entry 2');
    });

    it('Test16:Verify the entry page contents is correct when clicking on the second entry', async() => {
      //implement test15: Verify the header title is current when clicking on the second entry
      const entries = await page.$$('journal-entry');
      let data = await entries[1].getProperty('entry');
      let plainValue = await data.jsonValue();

      expect(plainValue.title).toBe('Run, Forrest! Run!');
      expect(plainValue.date).toBe('4/26/2021');
      expect(plainValue.content).toBe(`Mama always said life was like a box of chocolates. You never know what you're gonna get.`);
      expect(plainValue.image.src).toBe('https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg');
      expect(plainValue.image.alt).toBe('forrest running');
    });

    describe('Click on header', () => {
      beforeAll(async () => {
        await page.click("header > h1", el => el.textContent);
      });

      it('Test17: Verify clicking on second entry header goes back to home page', async() => {
        var url = page.url();
        url = url.split('/').pop();
        expect(url).toBe('');
      });

      describe('Click on back button', () => {
        beforeAll(async () => {
          await page.goBack();
        });

        it('Test18: Verify clicking on browser back button will go back to entry 2', async() => {
          var url = page.url();
          url = url.split('/').pop();
          expect(url).toBe('#entry2');
        });

        describe('Click on forward button', () => {
          beforeAll(async () => {
            await page.goForward();
          });

          it('Test19: Verify clicking on browser forward button will go again back to home', async() => {
            var url = page.url();
            url = url.split('/').pop();
            expect(url).toBe('');
          })

          describe('Click on entry 5', () => {
            beforeAll(async () => {
              await page.click('main journal-entry:nth-child(5)');
            });
           
            it('Test20: Verify the url is correct when clicking on the fifth entry', async() => {
              
              var url = page.url();
              url = url.split('/').pop();
              expect(url).toBe('#entry5');
            });
          });
        });
      });
    });
  });
});
