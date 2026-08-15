import '../global.css';
import styles from '../styles/works.module.css';
import { useRef } from 'react';

import CodeBlock from '../components/CodeBlock';
import Footer from '../components/Footer';
import Back from '../components/Back';
import { VIDEO_URLS } from '../constants/videos';
import useProjectInfoStagger from '../hooks/useProjectInfoStagger';

import Scan01 from '../assets/images/works/stamps/scan-01.webp';
import Test01 from '../assets/images/works/stamps/test-01.webp';
import Test02 from '../assets/images/works/stamps/test-02.webp';
import ColorCode01 from '../assets/images/works/stamps/color-code-01.webp';
import ColorCode02 from '../assets/images/works/stamps/color-code-02.webp';

function Stamps() {
  const projectInfoRef = useRef<HTMLDivElement | null>(null);
  useProjectInfoStagger(projectInfoRef);

  return (
    <>
      <section id="project-main" className={styles['project-main']}>
        <div ref={projectInfoRef} className={styles['project-info']}>
          <div className={styles['project-basics']}>
            <Back />
            <h1>THE STAMP ARCHIVE</h1>
            <br />
            <h2>2026</h2>
            <h3>Python, React, Three.js</h3>
          </div>
          <div className={styles['project-content']}>
            <div className={styles['project-intro']}>
              <p>An online archive of my father's stamp collection, spanning hundreds of pieces from around the world. The project preserves each stamp's story through careful scanning and cataloging, presenting them with the warmth of a personal museum rather than a flat database.</p>
              <br />
              <p>
                <a href="https://iamjkoko.github.io/stamp-gallery/" target="_blank" rel="noopener noreferrer" className="text-[#62abe5]">
                  Click to View
                </a>
              </p>
            </div>
          </div>
          <div className={styles['project-keywords']}>
            <span>FRONT-END</span>
            <span>PYTHON</span>
            <span>ARCHIVING</span>
          </div>
          <video className={styles['project-vid-hor']} src={VIDEO_URLS.STAMPS_DEMO_FULL} autoPlay loop muted playsInline controlsList="nodownload">
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <section id="project-description" className={styles['project-description']}>
          <div className={styles['description']}>
            <div className={styles['description-title']}>
              <h3>OVERVIEW</h3>
            </div>
            <div className={styles['description-body']}>
              <p>My father used to collect stamps when he traveled the world in his youth, as a practice he inherited from my grandfather. More than 40 years later, I discovered the stamp book in my grandparents' attic, which sparked a deep interest: a quiet inheritance spanning two generations, and a piece of my family's history I had not known to look for. This archive exists not merely to display the collection, but to cherish the memories and journeys it carries.</p>
              <br />
              <p>Bringing this collection online was not simply a matter of photographing what remained. Each stamp, some faded, some pristine, all carrying the particular wear of decades in storage, needed to be handled, scanned, and catalogued with the same care my grandfather and father once gave them. What follows is an account of that process: how the stamps were digitized, restored to visibility, and organized into the archive presented here.</p>
            </div>
          </div>
        </section>

        <section id="project-description" className={styles['project-description']}>
          <div className={styles['description']}>
            <div className={styles['description-title']}>
              <h3>PROCESS</h3>
            </div>
            <div className={styles['description-body']}>
              <p>One of the decisions I had to make before beginning the project was whether to scan the stamps manually, one by one, or develop a way to make the process efficient. After some research with Claude and Codex, I found that I could scan multiple stamps at once and create a Python script that automatically crops each stamp by tracing its contour lines.</p>
              <br />
              <p>The script works through a few stages, each solving a specific problem that came up while testing it on the actual scans.</p>
              <CodeBlock
                snippets={[
                  `THRESHOLD_VALUE = 90

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
_, binary = cv2.threshold(gray, THRESHOLD_VALUE, 255, cv2.THRESH_BINARY)`,
                ]}
              />
              <br />
              <p>The scans are essentially a two-tone problem: bright stamp against a dark album page. Converting to grayscale and applying one brightness cutoff is enough to separate the two cleanly. Essentially, this follows the same logic as a Magic Wand selection by brightness in Photoshop.</p>
              <CodeBlock
                snippets={[
                  `kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
closed = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel, iterations=2)
contours, _ = cv2.findContours(closed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
contours = [c for c in contours if cv2.contourArea(c) >= MIN_CONTOUR_AREA]`,
                ]}
              />
              <br />
              <p>The binary image is "closed" to bridge small gaps so each stamp forms one solid blob, then OpenCV traces the outline of every blob on the page. Anything too small to be a real stamp, such as dust, noise, scanner artifacts, gets filtered out by contour area. The contours are then sorted top-to-bottom and left-to-right so the stamps get numbered in a stable reading order.</p>
              <CodeBlock
                snippets={[
                  `bgra = cv2.cvtColor(crop, cv2.COLOR_BGR2BGRA)
bgra[:, :, 3] = mask_crop`,
                ]}
              />
              <br />
              <p>Once a stamp is straightened and its mask is built, the mask is applied as the alpha channel and the result is saved as a lossless PNG, plus a resized thumbnail for the gallery view.</p>
              <br />
              <br />
              <p>Throughout the process, some of the challenges had to be addressed through trial and error:</p>
              <br />
              <div className="mt-6 flex items-start gap-8 max-mobile:mt-4 max-mobile:flex-col max-mobile:gap-4">
                <img
                  src={Scan01}
                  alt="Scan 01"
                  className="w-[48%] shrink-0 rounded-[8px] max-mobile:w-full"
                />
                <p className="flex-1 min-w-0">Since the stamps weren't laid perfectly straight on the scanner bed, a plain rectangular crop wasn't going to work. Instead of having to rotate each stamp manually, I used <i>cv2.minAreaRect</i> to find the smallest rotated rectangle that fits around a stamp, angle included, and then had the script warp that rectangle so it lines up flat and level in the final image.</p>
              </div>

              <br />

              <div className="mt-6 flex items-start gap-8 max-mobile:mt-4 max-mobile:flex-col max-mobile:gap-4">
                <div className="flex w-[48%] shrink-0 gap-4 max-mobile:w-full">
                  <img
                    src={Test01}
                    alt="Test 01"
                    className="min-w-0 flex-1 rounded-[8px]"
                  />
                  <img
                    src={Test02}
                    alt="Test 02"
                    className="min-w-0 flex-1 rounded-[8px]"
                  />
                </div>
                <p className="flex-1 min-w-0">The first version of the cutouts (left) seemed mostly right, but many of them still had some dark halo left around the edges. This likely came from a thin strip of pixels in between the stamp and background colors which ended up in the final output. The fix was to shrink the transparency mask inward by a pixel, and soften the edge slightly with a blur, making the edges more crisp (right).</p>
              </div>
              <br />
              <div className="mt-6 flex items-start gap-8 max-mobile:mt-4 max-mobile:flex-col max-mobile:gap-4">
                <div className="flex w-[48%] shrink-0 flex-col gap-2 max-mobile:w-full">
                  <img
                    src={ColorCode01}
                    alt="Color Code 01"
                    className="w-full rounded-[8px]"
                  />
                  <img
                    src={ColorCode02}
                    alt="Color Code 02"
                    className="w-full rounded-[8px]"
                  />
                </div>
                <p className="flex-1 min-w-0">As I moved onto the gallery design, I wanted to return and focus on the purpose of the archive, which was not just to upload and recreate a database but to highlight a personal connection to the stamps and their stories. This led me to pick colors that felt warm and inviting, and a layout that was clean and easy to navigate.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="project-description" className={styles['project-description']}>
          <div className={styles['description']}>
            <div className={styles['description-title']}>
              <h3>REFLECTION</h3>
            </div>
            <div className={styles['description-body']}>
              <p>This project began as an attic discovery and became something closer to a question: what does it mean to carry a collection forward, rather than just preserving it? My grandfather started it; my father added to it as a teenager on his own journey; and I found it decades later in a box that hadn't been opened in years. The archive, in a sense, became my way of adding a third layer, without neglecting the first two.</p>
              <br />
              <p>Building it also became an inquiry about tools. I came to this project as an art major, and I was impressed by the capabilities of an AI-assisted workflow—how it allowed me to translate an idea into something real, more efficiently and flexibly than I could have on my own. Rather than giving complete authorship to AI tools, I felt it functioning more like a second brain: organizing, structuring, helping me see a clear path through problems I knew how to describe but not yet how to solve.</p>
              <br />
              <p>What remains most significant is not the finished gallery itself, but what the process revealed about my own direction. Throughout the project, I was able to understand how I wanted to approach my design practice going forward. The experience affirmed that art, design and computer science can come together to produce creative ideas and solutions, which is a path I intend to explore and continue to pursue.</p>
            </div>
          </div>
        </section>

        <br />

      <Footer theme="light" />
    </>
  );
}

export default Stamps;
