
export function tooltips() {

  const tooltips = document.querySelectorAll(".tooltip");

  function handle(_toltip) {
    const direction = _toltip.getAttribute('data-direction');
    const root = document.getElementById(_toltip.getAttribute('data-root'));

    if (!direction || !root) throw new Error("Direction or root is invalid!");


    function fixingPosition() {
      const app = document.querySelector("main form").getBoundingClientRect();
      const tooltipWidth = _toltip.getBoundingClientRect().width
      const rootPositions = root.getBoundingClientRect();
      const top = rootPositions.top;
      const left = rootPositions.left;
      const width = rootPositions.width;
      const height = rootPositions.height;
      const gap = 14;
      const arrowOffiset = 16;

      if (direction === 'top') {
        _toltip.style.top = `${top + gap + height}px`;
        _toltip.style.left = `${(left + gap + (width / 2) + arrowOffiset) - tooltipWidth}px`;
      }

      if (direction === 'bottom') {
        _toltip.style.top = `${(top - height - arrowOffiset) + gap}px`;
        _toltip.style.left = `${(left + (gap / 2) + (width / 2) + arrowOffiset) - tooltipWidth}px`;
      }
    }

    function attach() {
      function mutation(mutations) {
        for (const mutation of mutations) {

          if (mutation.attributeName === 'class') {
            const tooltip = document.querySelector(`.tooltip[data-root='${mutation.target.id}']`);

            if (mutation.target.classList.contains('tooltip-visible')) {

              tooltip.style.visibility = "visible";
            } else {
              tooltip.style.visibility = "hidden";
            }

            fixingPosition()
          }
        }
      }

      new MutationObserver(mutation).observe(root, { attributes: true });
    }


    attach()
  }




  tooltips.forEach(handle)
};