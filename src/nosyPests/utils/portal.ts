class AnimationPortal {
    static readonly portalName = 'nosy-pests-portal-container';

    private pestsDomContainer: HTMLDivElement | null = null;

    // ================ public ========================

    public getPestsContainer(): HTMLDivElement {
        if (this.pestsDomContainer === null) {
            this.pestsDomContainer = AnimationPortal.createPortalContainer();
        }
        return this.pestsDomContainer;
    }

    // ================ private ========================

    private static createPortalContainer() {
        const pestsCnt = document.createElement('div');
        pestsCnt.dataset.name = AnimationPortal.portalName;
        document.body.append(pestsCnt);
        return pestsCnt;
    }
}

const animationPortal = new AnimationPortal();
export default animationPortal;
