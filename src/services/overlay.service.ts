export class OverlayService {
  private static readonly VERTICAL_SPACE = 5;

  public static positionOverlay(target: Element, overlay: HTMLElement) {
    const targetPosition = target.getBoundingClientRect();

    if (
      targetPosition.bottom + this.VERTICAL_SPACE + overlay.offsetHeight <=
      window.innerHeight
    ) {
      overlay.style.top = `${targetPosition.bottom + this.VERTICAL_SPACE}px`;
    } else {
      overlay.style.top = `${targetPosition.top - overlay.offsetHeight - this.VERTICAL_SPACE}px`;
    }

    if (targetPosition.left + overlay.offsetWidth <= window.innerWidth) {
      overlay.style.left = `${targetPosition.left}px`;
    } else {
      overlay.style.left = `${targetPosition.right - overlay.offsetWidth}px`;
    }
  }
}
